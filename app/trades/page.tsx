
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import TradeCards from "@/components/TradeCards";
import { Trade } from "@/types/trade";

export default function TradesPage() {
  const [trades, setTrades] =
    useState<Trade[]>([]);

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

      setTrades(data);
    }

    fetchTrades();
  }, []);

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
        grid-cols-3
        gap-4
        "
      >
        <div
          className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-4
          shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            Total Trades
          </p>

          <h2
            className="
            mt-1
            text-2xl
            font-bold
            "
          >
            {trades.length}
          </h2>
        </div>

        <div
          className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-4
          shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            Open Trades
          </p>

          <h2
            className="
            mt-1
            text-2xl
            font-bold
            text-[#845eed]
            "
          >
            {
              trades.filter(
                (trade) =>
                  trade.status ===
                  "TRADING"
              ).length
            }
          </h2>
        </div>

        <div
          className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-4
          shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            Winning Trades
          </p>

          <h2
            className="
            mt-1
            text-2xl
            font-bold
            "
          >
            {
              trades.filter(
                (trade) =>
                  trade.status ===
                  "SUCCESS"
              ).length
            }
          </h2>
        </div>
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

