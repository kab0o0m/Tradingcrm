"use client";

interface SessionStats {
  [key: string]: {
    wins: number;
    losses: number;
  };
}

interface Props {
  sessionStats: SessionStats;
  selectedSession: string;
  onSelect: (
    session: string,
    stats: {
      wins: number;
      losses: number;
    }
  ) => void;
}

export default function SessionPerformance({
  sessionStats,
  selectedSession,
  onSelect,
}: Props) {
  return (
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
      <h2 className="text-lg font-semibold mb-5">
        Session Performance
      </h2>

      <div className="space-y-3">

        {Object.entries(sessionStats).map(
          ([session, stats]) => {

            const trades =
              stats.wins +
              stats.losses;

            const rate =
              (
                stats.wins /
                Math.max(trades, 1)
              ) *
              100;

            return (
              <button
                key={session}
                onClick={() =>
                  onSelect(
                    session,
                    stats
                  )
                }
                className={`
                w-full
                rounded-xl
                border
                p-4
                text-left
                transition

                ${
                  selectedSession ===
                  session
                    ? "border-[#845eed] bg-[#845eed]/5"
                    : "border-gray-200 hover:border-[#845eed]"
                }
                `}
              >
                <div className="flex justify-between">

                  <h3 className="font-semibold">
                    {session}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {trades} Trades
                  </span>

                </div>

                <p className="mt-3 text-3xl font-bold text-[#845eed]">
                  {rate.toFixed(1)}%
                </p>

                <p className="text-sm text-gray-500">
                  Win Rate
                </p>

              </button>
            );
          }
        )}

      </div>
    </div>
  );
}