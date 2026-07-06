"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  wins: number;
  losses: number;
}

const COLORS = [
  "#22c55e",
  "#ef4444",
];

export default function AnalyticsWinLossChart({
  wins,
  losses,
}: Props) {

  const data = [
    {
      name: "Wins",
      value: wins,
    },
    {
      name: "Losses",
      value: losses,
    },
  ];

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
          Win / Loss Ratio
        </h2>

        <p className="text-sm text-gray-500">
          Distribution of winning and losing trades.
        </p>

      </div>

      <div className="h-72">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={3}
            >

              {data.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-4 flex justify-center gap-8">

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />

          <span className="text-sm">
            Wins ({wins})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />

          <span className="text-sm">
            Losses ({losses})
          </span>
        </div>

      </div>

    </div>
  );
}