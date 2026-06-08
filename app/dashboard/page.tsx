"use client";

import { useEffect, useState } from "react";

import KpiCard from "@/components/DashboardCards";
import { DashboardData } from "@/types/dashboard";

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

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

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
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
          title="Wins"
          value={dashboard?.wins ?? 0}
        />

        <KpiCard
          title="PnL"
          value={`$${dashboard?.total_pnl ?? 0}`}
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
          col-span-2
          rounded-xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-sm
          "
        >
          <h2 className="font-semibold">
            Recent Trades
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Trades table coming next...
          </p>
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