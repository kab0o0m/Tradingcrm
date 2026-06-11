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
    async function fetchDashboard() {
      try {
        const token =
          localStorage.getItem("token");

        const response = await fetch(
          "http://127.0.0.1:8000/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();
        console.log(data);

        setDashboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);


  useEffect(() => {
    async function fetchRecentTrades() {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/trades/recent",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      setRecentTrades(data);
    }

    fetchRecentTrades();
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
          text-gray-900
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
            "
          >
            Recent Trades
          </h2>

          <div className="space-y-3">
            {recentTrades.map((trade) => (
              <div
                key={trade.id}
                className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-gray-100
                p-3
                "
              >
                <div>
                  <p className="font-medium">
                    {trade.pair}
                  </p>

                  <p
                    className="
                    text-xs
                    text-gray-500
                    "
                  >
                    {new Date(trade.entry_date)
                      .toLocaleDateString("en-SG")}
                  </p>
                </div>

                <div
                  className={
                    trade.pnl >= 0
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-600"
                  }
                >
                  {trade.pnl >= 0
                    ? `+$${trade.pnl}`
                    : `-$${Math.abs(
                        trade.pnl
                      )}`}
                </div>
              </div>
            ))}
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

        <div
          className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-sm
          "
        >
          <h2 className="font-semibold">
            Performance
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Analytics coming next...
          </p>
        </div>
      </div>

    </div>
  );
}