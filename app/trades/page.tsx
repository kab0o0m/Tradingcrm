
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import TradeCards from "@/components/TradeCards";
import { Trade } from "@/types/trade";
import Loader from "@/components/Loader"

import KpiCard from "@/components/DashboardCards";

export default function TradesPage() {
  const [trades, setTrades] =
    useState<Trade[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrades() {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/trades",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();
      console.log(data)
      setTrades(data);
      setLoading(false);
    }

    fetchTrades();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }  

  async function handleDelete(
    tradeId: number
  ) {
    const confirmed =
      window.confirm(
        "Delete this trade?"
      );

    if (!confirmed) return;

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:8000/trades/${tradeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setTrades((prevTrades) =>
        prevTrades.filter(
          (trade) =>
            trade.id !== tradeId
        )
      );
    } 
  }

  return (
    <div className="p-6">

      {/* Header */}

      <div
        className="
        mb-8
        flex
        items-center
        justify-between
        "
      >
        <div>
          <h1
            className="
            text-3xl
            font-bold
            text-gray-900
            "
          >
            Trades
          </h1>

          <p
            className="
            mt-1
            text-sm
            text-gray-500
            "
          >
            Manage and review
            your trading journal
          </p>
        </div>

        <Link
          href="/trades/new"
          className="
          rounded-xl
          bg-[#845eed]
          px-5
          py-3
          text-sm
          font-medium
          text-white
          transition
          hover:bg-[#7347df]
          "
        >
          + New Trade
        </Link>
      </div>

      {/* Summary Cards */}

      <div
        className="
        mb-6
        grid
        grid-cols-5
        gap-3
        "
      >

        <KpiCard
          title="Total Trades"
          value={
            trades.length
          }
          
        />

        <KpiCard
          title="Win Rate"
          value={`${(
            (
              trades.filter(
                (trade) =>
                  trade.status ===
                  "SUCCESS"
              ).length /
              Math.max(
                trades.filter(
                  (trade) =>
                    trade.status ===
                      "SUCCESS" ||
                    trade.status ===
                      "FAIL"
                ).length,
                1
              )
            ) * 100
          ).toFixed(2)}%`}
        />

        <KpiCard
          title="Winning Trades"
          value={
            trades.filter(
              (trade) =>
                trade.status ===
                "SUCCESS"
            ).length
          }
          
        />

        <KpiCard
          title="Losing Trades"
          value={
            trades.filter(
              (trade) =>
                trade.status ===
                "FAIL"
            ).length
          }
        />

        <KpiCard
          title="Early Exit Trades"
          value={
            trades.filter(
              (trade) =>
                trade.status ===
                "EARLY_EXIT"
            ).length
          } 
        />

        

      </div>

      {/* Table Card */}

      <div
        className="
        overflow-hidden
        rounded-2xl
        shadow-sm
        "
      >
        <TradeCards
          trades={trades}
          onDelete={handleDelete}
        />
      </div>

    </div>
  );
}

