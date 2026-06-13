
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import TradeCards from "@/components/TradeCards";
import { Trade } from "@/types/trade";
import Loader from "@/components/Loader"

import KpiCard from "@/components/DashboardCards";

import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function TradesPage() {
  const [trades, setTrades] =
    useState<Trade[]>([]);
  const [loading, setLoading] = useState(true)
  const [pairFilter, setPairFilter] =
  useState("");

  const [sessionFilter, setSessionFilter] =
    useState("");

  const [statusFilter, setStatusFilter] = useState("")


  useEffect(() => {
    async function fetchTrades() {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
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
      `https://tradingcrmbackend-1.onrender.com/trades/${tradeId}`,
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

  const filteredTrades =
    trades.filter((trade) => {

      const pairMatch =
        !pairFilter ||
        trade.pair === pairFilter;

      const sessionMatch =
        !sessionFilter ||
        trade.session ===
          sessionFilter;

      const statusMatch =
        !statusFilter ||
        trade.status ===
          statusFilter;

      return (
        pairMatch &&
        sessionMatch &&
        statusMatch
      );
    });

  const wins =
    filteredTrades.filter(
      (trade) =>
        trade.status ===
        "SUCCESS"
    ).length;

  const losses =
    filteredTrades.filter(
      (trade) =>
        trade.status ===
        "FAIL"
    ).length;

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
            filteredTrades.length
          }
          
        />

        <KpiCard
          title="Win Rate"
          value={`${(
            (
              filteredTrades.filter(
                (trade) =>
                  trade.status ===
                  "SUCCESS"
              ).length /
              Math.max(
                filteredTrades.filter(
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
            filteredTrades.filter(
              (trade) =>
                trade.status ===
                "SUCCESS"
            ).length
          }
          
        />

        <KpiCard
          title="Losing Trades"
          value={
            filteredTrades.filter(
              (trade) =>
                trade.status ===
                "FAIL"
            ).length
          }
        />

        <KpiCard
          title="Total P&L"
            value={"$" +
              filteredTrades.reduce(
                (total, trade) => total + (trade.pnl || 0),
                0
              ).toFixed(2)
            }
        />

        

      </div>
      
      
      {/* Filters */}
      <div
        className="
        mb-6
        flex
        gap-4
        "
      >
        <div className="relative">
          <select
            value={pairFilter}
            onChange={(e) =>
              setPairFilter(
                e.target.value
              )
            }
            className="
            rounded-xl
            border
            border-gray-200
            bg-white
            px-3
            py-3
            pr-8
            appearance-none
            "
          >
            <option value="">
              All Pairs
            </option>

            {[
              ...new Set(
                trades.map(
                  (trade) =>
                    trade.pair
                )
              ),
            ].map((pair) => (
              <option
                key={pair}
                value={pair}
              >
                {pair}
              </option>
            ))}
            
          </select>
          <ChevronDownIcon
            className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-gray-400
            "
          />
        </div>
        <div className="relative">
          <select
            value={sessionFilter}
            onChange={(e) =>
              setSessionFilter(
                e.target.value
              )
            }
            className="
            rounded-xl
            border
            border-gray-200
            bg-white
            px-4
            py-3
            pr-8
            appearance-none
            "
          >
            <option value="">
              All Sessions
            </option>

            <option value="LONDON">
              London
            </option>

            <option value="NEWYORK">
              New York
            </option>
          </select>
          <ChevronDownIcon
              className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-gray-400
              "
            />
        </div>

        <div className="relative">

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="
          appearance-none
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-3
          pr-8
          "
        >
          <option value="">
            All Results
          </option>

          <option value="SUCCESS">
            Success
          </option>

          <option value="FAIL">
            Fail
          </option>

          <option value="EARLY_EXIT">
            Early Exit
          </option>

          <option value="BREAK_EVEN">
            Break Even
          </option>

        </select>

        <ChevronDownIcon
          className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-gray-400
          "
        />

      </div>

        {(pairFilter ||
          sessionFilter || statusFilter) && (
          <button
            onClick={() => {
              setPairFilter("");
              setSessionFilter("");
              setStatusFilter("")
            }}
            className="
            rounded-xl
            border
            border-gray-200
            px-4
            py-3
            text-sm
            hover:bg-gray-50
            cursor-pointer
            "
          >
            Clear Filters
          </button>
        )}
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
          trades={filteredTrades}
          onDelete={handleDelete}
        />
      </div>

    </div>
  );
}

