"use client";

import { Trade } from "@/types/trade";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface AnalyticsPnLChartProps {
  trades: Trade[];
}

export default function AnalyticsPnLChart({
  trades,
}: AnalyticsPnLChartProps) {

  let runningPnl = 0;

  const chartData = [...trades]
    .sort(
      (a, b) =>
        new Date(a.entry_date).getTime() -
        new Date(b.entry_date).getTime()
    )
    .map((trade, index) => {

      runningPnl += trade.pnl;

      return {
        trade: index + 1,
        pnl: Number(runningPnl.toFixed(2)),
        pair: trade.pair,
        date: new Date(
          trade.entry_date
        ).toLocaleDateString("en-SG"),
      };
    });

  return (
    <div
      className="
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-6
      shadow-sm
      mb-5
      "
    >
      <div className="mb-5">

        <h2 className="text-lg font-semibold">
          Equity Curve
        </h2>

        <p className="text-sm text-gray-500">
          Cumulative profit & loss over time.
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="trade"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              formatter={(value: number) => [
                `$${value.toFixed(2)}`,
                "Balance",
              ]}
              labelFormatter={(label) =>
                `Trade #${label}`
              }
            />

            <Line
              type="monotone"
              dataKey="pnl"
              stroke="#845eed"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>
    </div>
  );
}