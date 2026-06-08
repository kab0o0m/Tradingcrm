import { Trade } from "@/types/trade";
import Link from "next/link";

interface TradeTableProps {
  trades: Trade[];
  onDelete: (id: number) => void;
}

export default function TradeTable({
  trades,
  onDelete,
}: TradeTableProps) {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Pair</th>
          <th className="border p-2">Direction</th>
          <th className="border p-2">Strategy</th>
          <th className="border p-2">Session</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">P&L</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {trades.length === 0 ? (
          <tr>
            <td
              colSpan={8}
              className="p-4 text-center"
            >
              No trades found
            </td>
          </tr>
        ) : (
          trades.map((trade) => (
            <tr key={trade.id}>

              <td className="border p-2">
                {trade.pair}
              </td>

              <td className="border p-2">
                {trade.direction}
              </td>

              <td className="border p-2">
                {trade.strategy}
              </td>

              <td className="border p-2">
                {trade.session}
              </td>

              <td className="border p-2">
                {trade.status}
              </td>

              <td className="border p-2">
                {trade.pnl}
              </td>

              <td className="border p-2">
                <div className="flex gap-2">

                  <Link
                    href={`/trades/${trade.id}/edit`}
                    className="rounded bg-blue-500 px-3 py-1 text-white"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(trade.id)
                    }
                    className="rounded bg-red-500 px-3 py-1 text-white"
                  >
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

