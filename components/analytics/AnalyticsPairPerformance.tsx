"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

interface Props {
  pairStats: Record<
    string,
    {
      trades: number;
      pnl: number;
    }
  >;
}

export default function AnalyticsPairPerformance({
  pairStats,
}: Props) {

  const data = Object.entries(pairStats)
    .map(([pair, stats]) => ({
      pair,
      pnl: Number(stats.pnl.toFixed(2)),
      trades: stats.trades,
    }))
    .sort((a, b) => b.pnl - a.pnl);

  return (
    <div
      className="
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-6
      shadow-sm
      "
    >

      <div className="mb-5">

        <h2 className="text-lg font-semibold">
          Pair Performance
        </h2>

        <p className="text-sm text-gray-500">
          Total P&L by trading pair.
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer>

          <BarChart
            data={data}
            layout="vertical"
          >

            <XAxis
              type="number"
            />

            <YAxis
              type="category"
              dataKey="pair"
              width={80}
            />

            <Tooltip
              formatter={(value:number) => [
                `$${value}`,
                "P&L",
              ]}
            />

            <Bar
              dataKey="pnl"
              radius={[6,6,6,6]}
            >

              {data.map((entry,index)=>(
                <Cell
                  key={index}
                  fill={
                    entry.pnl >= 0
                      ? "#22c55e"
                      : "#ef4444"
                  }
                />
              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}