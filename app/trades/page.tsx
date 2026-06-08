"use client";

import { useEffect, useState } from "react";
import TradeTable from "@/components/TradeTable";
import { Trade } from "@/types/trade";

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    async function fetchTrades() {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/trades",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setTrades(data);
      console.log(data)
    }

    fetchTrades();
  }, []);

  async function handleDelete(
    tradeId: number
  ) {
    const confirmed = window.confirm(
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
    } else {
      alert("Failed to delete trade");
    }
  }

  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl font-bold">
        Trades
      </h1>

      <TradeTable
        trades={trades}
        onDelete={handleDelete}
      />
    </div>
  );
}