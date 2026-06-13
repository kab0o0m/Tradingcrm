"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import KpiCard from "@/components/DashboardCards";
import AnalyticsCalendar from "@/components/AnalyticsCalendar";

import { Trade } from "@/types/trade";

export default function AnalyticsPage() {

  const [trades, setTrades] =
    useState<Trade[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchTrades() {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          "https://tradingcrmbackend-1.onrender.com/trades",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      setTrades(data);

      setLoading(false);
    }

    fetchTrades();

  }, []);

  if (loading) {
    return <Loader />;
  }

  const wins =
    trades.filter(
      (trade) =>
        trade.status ===
        "SUCCESS"
    );

  const losses =
    trades.filter(
      (trade) =>
        trade.status ===
        "FAIL"
    );

  const winRate =
    (
      wins.length /
      Math.max(
        wins.length +
          losses.length,
        1
      )
    ) * 100;

  const grossProfit =
    wins.reduce(
      (sum, trade) =>
        sum + trade.pnl,
      0
    );

  const grossLoss =
    Math.abs(
      losses.reduce(
        (sum, trade) =>
          sum + trade.pnl,
        0
      )
    );

  const profitFactor =
    grossLoss > 0
      ? grossProfit /
        grossLoss
      : 0;

  const avgWin =
    wins.length > 0
      ? grossProfit /
        wins.length
      : 0;

  const avgLoss =
    losses.length > 0
      ? grossLoss /
        losses.length
      : 0;

  const totalPnl =
    trades.reduce(
      (sum, trade) =>
        sum + trade.pnl,
      0
    );

  const pairStats:
    Record<
      string,
      {
        trades: number;
        pnl: number;
      }
    > = {};

  trades.forEach(
    (trade) => {

      if (
        !pairStats[
          trade.pair
        ]
      ) {
        pairStats[
          trade.pair
        ] = {
          trades: 0,
          pnl: 0,
        };
      }

      pairStats[
        trade.pair
      ].trades++;

      pairStats[
        trade.pair
      ].pnl +=
        trade.pnl;
    }
  );

  const sessionStats:
    Record<
      string,
      {
        wins: number;
        losses: number;
      }
    > = {};

  trades.forEach(
    (trade) => {

      if (
        !sessionStats[
          trade.session
        ]
      ) {
        sessionStats[
          trade.session
        ] = {
          wins: 0,
          losses: 0,
        };
      }

      if (
        trade.status ===
        "SUCCESS"
      ) {
        sessionStats[
          trade.session
        ].wins++;
      }

      if (
        trade.status ===
        "FAIL"
      ) {
        sessionStats[
          trade.session
        ].losses++;
      }
    }
  );

  const last10Trades =
    trades.slice(0, 10);

  return (
    <div className="p-6">

      <div className="mb-8">
        <h1
          className="
          text-3xl
          font-bold
          mb--5
          "
        >
          Analytics
        </h1>
      </div>

      <div
        className="
        mb-6
        "
        >

        <AnalyticsCalendar
            trades={trades}
        />
        </div>

      <div
        className="
        mb-6
        grid
        grid-cols-4
        gap-4
        "
      >
        <KpiCard
          title="Win Rate"
          value={`${winRate.toFixed(
            2
          )}%`}
        />

        <KpiCard
          title="Profit Factor"
          value={profitFactor.toFixed(
            2
          )}
        />

        <KpiCard
          title="Avg Win"
          value={`$${avgWin.toFixed(
            2
          )}`}
        />

        <KpiCard
          title="Avg Loss"
          value={`$${avgLoss.toFixed(
            2
          )}`}
        />
      </div>

      <div
        className="
        mb-6
        grid
        grid-cols-2
        gap-4
        "
      >

        <div
          className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
          "
        >
          <h2
            className="
            mb-4
            text-lg
            font-semibold
            "
          >
            Pair Performance
          </h2>

          <div className="space-y-3">
            {Object.entries(
              pairStats
            ).map(
              ([pair, stats]) => (
                <div
                  key={pair}
                  className="
                  flex
                  justify-between
                  "
                >
                  <span>
                    {pair}
                  </span>

                  <span
                    className={
                      stats.pnl >=
                      0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    $
                    {stats.pnl.toFixed(
                      2
                    )}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div
          className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
          "
        >
          <h2
            className="
            mb-4
            text-lg
            font-semibold
            "
          >
            Session
            Performance
          </h2>

          <div className="space-y-3">
            {Object.entries(
              sessionStats
            ).map(
              (
                [
                  session,
                  stats,
                ]
              ) => {

                const rate =
                  (
                    stats.wins /
                    Math.max(
                      stats.wins +
                        stats.losses,
                      1
                    )
                  ) * 100;

                return (
                  <div
                    key={
                      session
                    }
                    className="
                    flex
                    justify-between
                    "
                  >
                    <span>
                      {
                        session
                      }
                    </span>

                    <span>
                      {rate.toFixed(
                        1
                      )}
                      %
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>

      </div>

      <div
        className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        "
      >
        <h2
          className="
          mb-4
          text-lg
          font-semibold
          "
        >
          Last 10 Trades
        </h2>

        <div className="flex gap-2">
          {last10Trades.map(
            (trade) => (
              <div
                key={trade.id}
                className={`
                  h-10
                  w-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-white
                  font-bold

                  ${
                    trade.status ===
                    "SUCCESS"
                      ? "bg-green-500"
                      : trade.status ===
                        "FAIL"
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }
                `}
              >
                {trade.status ===
                "SUCCESS"
                  ? "W"
                  : trade.status ===
                    "FAIL"
                  ? "L"
                  : "-"}
              </div>
            )
          )}
        </div>

      </div>

    </div>
  );
}