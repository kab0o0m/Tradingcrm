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
          h-20
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
            text-sm
            font-medium
            text-gray-600
          "
        >
          {day}
        </div>

        {tradeCount > 0 && (
          <div
            className="
              h-full
              flex
              flex-col
              items-center
              justify-center
            "
          >
            <div
              className={`
                text-lg
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
              ${pnl.toFixed(
                2
              )}
            </div>

            <div
              className="
                text-xs
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