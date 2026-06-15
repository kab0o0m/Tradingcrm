"use client";

import { useState } from "react";
import { Trade } from "@/types/trade";

interface Props {
  trades: Trade[];
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AnalyticsCalendar({
  trades,
}: Props) {

  const [currentDate, setCurrentDate] =
    useState(new Date());

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  const firstDay =
    new Date(
      year,
      month,
      1
    );

  const lastDay =
    new Date(
      year,
      month + 1,
      0
    );

  const daysInMonth =
    lastDay.getDate();

  const startingDay =
    firstDay.getDay();

  const dailyStats: Record<
    string,
    {
      pnl: number;
      trades: number;
    }
  > = {};

  trades.forEach((trade) => {

    if (!trade.entry_date)
      return;

    const tradeDate =
      new Date(
        trade.entry_date
      );

    if (
      tradeDate.getMonth() !==
        month ||
      tradeDate.getFullYear() !==
        year
    ) {
      return;
    }

    const date =
      trade.entry_date.split(
        "T"
      )[0];

    if (!dailyStats[date]) {
      dailyStats[date] = {
        pnl: 0,
        trades: 0,
      };
    }

    dailyStats[date].pnl +=
      trade.pnl;

    dailyStats[date].trades++;
  });

  const getTradesForDate = (
    date: string
  ) => {
    return trades.filter(
      (trade) =>
        trade.entry_date?.split(
          "T"
        )[0] === date
    );
  };

  const cells = [];

  for (
    let i = 0;
    i < startingDay;
    i++
  ) {
    cells.push(
      <div
        key={`empty-${i}`}
        className="
          h-20
          rounded-xl
          bg-transparent
        "
      />
    );
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {

    const date =
      `${year}-${String(
        month + 1
      ).padStart(
        2,
        "0"
      )}-${String(
        day
      ).padStart(
        2,
        "0"
      )}`;

    const stats =
      dailyStats[date];

    const pnl =
      stats?.pnl ?? 0;

    const tradeCount =
      stats?.trades ?? 0;

    const dayTrades =
      getTradesForDate(
        date
      );

    let bgClass =
      "bg-white border-gray-200";

    if (pnl > 0) {
      bgClass =
        "bg-green-50 border-green-300";
    }

    if (pnl < 0) {
      bgClass =
        "bg-red-50 border-red-300";
    }

    cells.push(
      <div
        key={date}
        className={`
          group
          h-30
          rounded-xl
          border
          relative
          transition-all
          hover:shadow-md
          ${bgClass}
        `}
      >
        <div
          className="
            absolute
            top-2
            left-3
            text-medium
            font-medium
            text-gray-600
          "
        >
          {day}
        </div>

        {tradeCount > 0 && (
          <>
            <div
              className="
                h-full
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
              "
            >
              <div
                className={`
                  text-medium
                  font-bold
                  ${
                    pnl > 0
                      ? "text-green-700"
                      : "text-red-700"
                  }
                `}
              >
                {pnl > 0
                  ? "+"
                  : ""}
                $
                {pnl.toFixed(
                  2
                )}
              </div>

              <div
                className="
                  text-[10px]
                  text-gray-500
                  mt-1
                "
              >
                {tradeCount}
                {" "}
                Trade
                {tradeCount > 1
                  ? "s"
                  : ""}
              </div>
            </div>

            {/* Tooltip */}

            <div
              className="
                invisible
                opacity-0
                group-hover:visible
                group-hover:opacity-100
                transition-all

                absolute
                z-50

                left-1/2
                top-full
                mt-2

                -translate-x-1/2

                min-w-[280px]

                rounded-xl
                border
                border-gray-200

                bg-white
                p-4

                shadow-xl
              "
            >
              <div
                className="
                  mb-3
                  text-sm
                  font-semibold
                "
              >
                {new Date(date).toLocaleDateString('en-GB')}
              </div>

              <div className="space-y-2">
                {dayTrades.map(
                  (
                    trade
                  ) => (
                    <div
                      key={
                        trade.id
                      }
                      className="
                        flex
                        justify-between
                        text-xs
                      "
                    >
                      <div>
                        <div
                          className="
                            font-medium
                          "
                        >
                          {
                            trade.pair
                          }
                        </div>

                        <div
                          className="
                            text-gray-500
                          "
                        >
                          {
                            trade.session
                          }
                        </div>
                      </div>

                      <div
                        className={
                          trade.pnl >=
                          0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {trade.pnl >=
                        0
                          ? "+"
                          : ""}
                        $
                        {trade.pnl.toFixed(
                          2
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div
                className="
                  mt-3
                  border-t
                  pt-3
                "
              >
                <div
                  className="
                    flex
                    justify-between
                    text-xs
                    font-semibold
                  "
                >
                  <span>
                    Total
                  </span>

                  <span
                    className={
                      pnl >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {pnl >= 0
                      ? "+"
                      : ""}
                    $
                    {pnl.toFixed(
                      2
                    )}
                  </span>
                </div>

                <div
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                  "
                >
                  {tradeCount}
                  {" "}
                  Trade
                  {tradeCount > 1
                    ? "s"
                    : ""}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        overflow-visible
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >
        <button
          onClick={() =>
            setCurrentDate(
              new Date(
                year,
                month - 1,
                1
              )
            )
          }
          className="
            px-4
            py-2
            rounded-lg
            border
            border-gray-200
            hover:bg-gray-100
            cursor-pointer
          "
        >
          ←
        </button>

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          {
            MONTH_NAMES[
              month
            ]
          }{" "}
          {year}
        </h2>

        <button
          onClick={() =>
            setCurrentDate(
              new Date(
                year,
                month + 1,
                1
              )
            )
          }
          className="
            px-4
            py-2
            rounded-lg
            border
            border-gray-200
            hover:bg-gray-100
            cursor-pointer
          "
        >
          →
        </button>
      </div>

      <div
        className="
          grid
          grid-cols-7
          gap-2
          mb-2
        "
      >
        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].map(
          (day) => (
            <div
              key={day}
              className="
                text-center
                text-sm
                font-semibold
                text-gray-500
              "
            >
              {day}
            </div>
          )
        )}
      </div>

      <div
        className="
          grid
          grid-cols-7
          gap-2
        "
      >
        {cells}
      </div>
    </div>
  );
}