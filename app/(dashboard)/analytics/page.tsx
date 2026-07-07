"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import KpiCard from "@/components/DashboardCards";
import AnalyticsFilters from "@/components/analytics/AnalyticsFilters";
import AnalyticsStatistics from "@/components/analytics/AnalyticsStatistics";
import PairPerformance from "@/components/analytics/AnalyticsPairPerformance";
import SessionPerformance from "@/components/analytics/AnalyticsSessionPerformance";
import AnalyticsCalendar from "@/components/analytics/AnalyticsCalendar";
import AnalyticsPnLChart from "@/components/analytics/AnalyticsPnLChart";
import AnalyticsWinLossChart from "@/components/analytics/AnalyticsWinLossChart";

import { Trade } from "@/types/trade";

export default function AnalyticsPage() {

  const [trades, setTrades] =
    useState<Trade[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [dateFilter, setDateFilter] = useState("ALL");

  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [session, setSession] = useState("LONDON");
  const [pairFilter, setPairFilter] = useState("ALL");

  const [stats, setStats] = useState<{
    wins: number;
    losses: number;
  } | null>(null);


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

  const filteredTrades =
  trades.filter((trade) => {

    if (!trade.entry_date)
      return false;

    const tradeDate =
      new Date(
        trade.entry_date
      );

    const today =
      new Date();

    if (
      dateFilter ===
      "WEEK"
    ) {
      const weekAgo =
        new Date();

      weekAgo.setDate(
        today.getDate() - 7
      );

      return (
        tradeDate >= weekAgo
      );
    }

    if (
      dateFilter ===
      "MONTH"
    ) {
      return (
        tradeDate.getMonth() ===
          today.getMonth() &&
        tradeDate.getFullYear() ===
          today.getFullYear()
      );
    }

    if (
      dateFilter ===
      "30D"
    ) {
      const monthAgo =
        new Date();

      monthAgo.setDate(
        today.getDate() - 30
      );

      return (
        tradeDate >= monthAgo
      );
    }

    if (
      dateFilter ===
      "CUSTOM"
    ) {

      if (
        !customStartDate ||
        !customEndDate
      ) {
        return true;
      }

      const start =
        new Date(
          customStartDate
        );

      const end =
        new Date(
          customEndDate
        );

      end.setHours(
        23,
        59,
        59,
        999
      );

      return (
        tradeDate >= start &&
        tradeDate <= end
      );
    }

    if (
      pairFilter !== "ALL" &&
      trade.pair !== pairFilter
    ) {
      return false;
    }

    return true;
  });

  const wins =
    filteredTrades.filter(
      (trade) =>
        trade.status ===
        "SUCCESS"
    );

  const losses =
    filteredTrades.filter(
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
    filteredTrades.reduce(
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

  filteredTrades.forEach(
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

  filteredTrades.forEach(
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
    filteredTrades.slice(0, 10);

  return (
    <div className="p-6">

      <div className="mb-8">
        <h1
          className="
          text-3xl
          font-bold
          mb--5
          bg-gradient-to-r
          from-violet-500
          to-purple-500
          bg-clip-text
          text-transparent
          inline-block
          "
        >
          Analytics
        </h1>
      </div>





      <AnalyticsCalendar 
        trades={trades}/>

      <AnalyticsFilters
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}

        customStartDate={customStartDate}
        setCustomStartDate={setCustomStartDate}

        customEndDate={customEndDate}
        setCustomEndDate={setCustomEndDate}

        pairFilter={pairFilter}
        setPairFilter={setPairFilter}

        trades={trades}
      />

      <AnalyticsStatistics
        winRate={winRate}
        totalPnl={totalPnl}
        wins={wins.length}
        losses={losses.length}
        profitFactor={profitFactor}
        avgWin={avgWin}
        avgLoss={avgLoss}
      />

      <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="col-span-2">
            <AnalyticsPnLChart
                trades={filteredTrades}
            />
        </div>

          <AnalyticsWinLossChart
            wins={wins.length}
            losses={losses.length}
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
      <SessionPerformance
        sessionStats={sessionStats}
        selectedSession={session}
        onSelect={(selected, stats) => {
            setSession(selected);
            setStats(stats);
        }}
    />

              <div
        className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        h-30
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

      <PairPerformance
          pairStats={pairStats}
      />





      </div>

    </div>
  );
}