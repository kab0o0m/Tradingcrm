"use client";

import { useEffect, useState } from "react";

import KpiCard from "@/components/DashboardCards";
import { DashboardData } from "@/types/dashboard";
import Loader from "@/components/Loader"
import { Trade } from "@/types/trade";

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [recentTrades, setRecentTrades] = 
    useState<Trade[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token =
          localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          dashboardResponse,
          recentTradesResponse,
        ] = await Promise.all([
          fetch(
            "https://tradingcrmbackend-1.onrender.com/dashboard",
            { headers }
          ),
          fetch(
            "https://tradingcrmbackend-1.onrender.com/trades/recent",
            { headers }
          ),
        ]);

        const [
          dashboardData,
          recentTradesData,
        ] = await Promise.all([
          dashboardResponse.json(),
          recentTradesResponse.json(),
        ]);

        console.log(
          dashboardData
        );

        setDashboard(
          dashboardData
        );

        setRecentTrades(
          recentTradesData
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }
  
  

  return (
    
    <div className="p-6">

      {/* Header */}

      <div className="mb-6">
        <h1
          className="
          text-3xl
          font-bold
          bg-gradient-to-r
          from-violet-500
          to-purple-500
          bg-clip-text
          text-transparent
          inline-block
          "
        >
          Dashboard
        </h1>

        <p
          className="
          mt-1
          text-sm
          text-gray-500
          "
        >
          Your trading performance at a glance
        </p>
      </div>

      {/* KPI Cards */}

      <div
        className="
        mb-6
        grid
        grid-cols-5
        gap-3
        "
      >
        <KpiCard
          title="Balance"
          value={`$${Number(
            dashboard?.balance ?? 0
          ).toLocaleString()}`}
        />

        <KpiCard
          title="Trades"
          value={dashboard?.total_trades ?? 0}
        />

        <KpiCard
          title="Win Rate"
          value={`${dashboard?.win_rate ?? 0}%`}
        />


        <KpiCard
          title="P&L"
          value={`$${dashboard?.total_pnl ?? 0}`}
          color={
            (dashboard?.total_pnl ?? 0) >= 0
              ? "text-green-300"
              : "text-red-400"
          }
        />

        <KpiCard
          title="1% Risk"
          value={`$${((dashboard?.balance ?? 0 ) /100).toFixed(2) }`}
        />
      </div>

      {/* Alert */}

      <div
        className="
        mb-6
        rounded-xl
        border
        border-[#845eed]/20
        bg-[#845eed]/5
        p-4
        "
      >
        <p
          className="
          text-sm
          text-[#845eed]
          "
        >
          Stay disciplined. Follow your trading
          plan and risk management rules.
        </p>
      </div>

      {/* Placeholder for next section */}

      <div
        className="
        grid
        grid-cols-3
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
            text-gray-900
            "
          >
            Trading Rules
          </h2>

          <ul
            className="
            space-y-3
            text-sm
            text-gray-600
            "
          >
            <li className="flex items-center gap-2">
              <span className="text-[#845eed]">
                •
              </span>
              Maximum 2 trades per session
            </li>

            <li className="flex items-center gap-2">
              <span className="text-[#845eed]">
                •
              </span>
              Risk 1% per trade
            </li>

            <li className="flex items-center gap-2">
              <span className="text-[#845eed]">
                •
              </span>
              Trade only A+ setups
            </li>

            <li className="flex items-center gap-2">
              <span className="text-[#845eed]">
                •
              </span>
              No revenge trading
            </li>

            <li className="flex items-center gap-2">
              <span className="text-[#845eed]">
                •
              </span>
              Stop after 2 consecutive losses
            </li>
          </ul>
        </div>


        {/* Trading Strategy */}

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
            Trading Strategy
          </h2>

          <div className="space-y-4 text-sm">

            <div>
              <p className="font-medium text-gray-900">
                1. Mark ORB & Liquidity
              </p>

              <p className="text-gray-600">
                Mark the first 15 minutes of market open.
                Identify the most recent 5m high and 5m low.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">
                2. Fixed Volume Range
              </p>

              <p className="text-gray-600">
                Draw a Fixed Volume Range using the first
                3 candles on the 5-minute chart.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">
                3. Liquidity Sweep
              </p>

              <p className="text-gray-600">
                Wait for price to break out and sweep
                the recent 5m high or 5m low.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">
                4. Entry
              </p>

              <p className="text-gray-600">
                Enter on the retracement back into the
                Fixed Volume Range.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">
                5. Risk Management
              </p>

              <p className="text-gray-600">
                Fixed 2:1 Risk-Reward. Risk 1% per trade.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}