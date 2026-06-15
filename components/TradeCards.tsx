
import Link from "next/link";
import { Trade } from "@/types/trade";

interface TradeCardsProps {
  trades: Trade[];
  onDelete: (id: number) => void;
}

export default function TradeCards({
  trades,
  onDelete,
}: TradeCardsProps) {
  const getStatusStyle = (
    status: string
  ) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-700";

      case "FAIL":
        return "bg-red-100 text-red-700";

      case "BREAK_EVEN":
        return "bg-gray-100 text-gray-700";

      case "EARLY_EXIT":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-[#845eed]/10 text-[#845eed]";
    }
  };

  if (trades.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center">
        <p className="text-gray-500">
          No trades recorded yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      grid
      gap-8
      sm:grid-cols-2
      md:grid-cols-3
      xl:grid-cols-4
      "
    >
      {trades.map((trade) => (
        <div
          key={trade.id}
          className="
          rounded-3xl
          border
          border-gray-100
          bg-white
          p-6
          transition
          hover:-translate-y-1
          hover:shadow-lg
          "
        >
          {/* Header */}

          <div className="flex justify-between">

            <div>

              <div
                className="
                flex
                items-center
                gap-2
                "
              >
                <h2
                  className="
                  text-xl
                  font-semibold
                  text-gray-900
                  "
                >
                  {trade.pair}
                </h2>

                <span
                  className={
                    "rounded-full px-3 py-1 text-xs font-medium " +
                    getStatusStyle(
                      trade.status
                    )
                  }
                >
                  {trade.status}
                </span>
              </div>

              <div
                className="
                mt-2
                flex
                items-center
                gap-2
                text-sm
                text-gray-500
                "
              >
                <span>
                  {new Date(
                    trade.entry_date
                  ).toLocaleDateString(
                    "en-SG",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </span>

                <span className="text-gray-300">
                  |
                </span>
                
                <span>
                  {trade.direction} •{" "}
                  {trade.session}
                </span>

                


              </div>

            </div>

            <div
              className={
                trade.pnl >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              <p
                className="
                text-2xl
                font-bold
                "
              >
                {trade.pnl >= 0
                  ? `+$${trade.pnl}`
                  : `-$${Math.abs(
                      trade.pnl
                    )}`}
              </p>
            </div>

          </div>


          {/* Actions */}

          <div
            className="
            mt-6
            flex
            gap-2
            "
          >
            <Link
              href={`/trades/${trade.id}/edit`}
              className="
              flex-1
              rounded-xl
              bg-[#845eed]
              py-2
              text-center
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#7347df]
              "
            >
              Edit
            </Link>

            <button
              onClick={() =>
                onDelete(trade.id)
              }
              className="
              flex-1
              rounded-xl
              border
              border-red-200
              py-2
              text-sm
              font-medium
              text-red-600
              transition
              hover:bg-red-50
              cursor-pointer
              "
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

