import KpiCard from "../DashboardCards";

interface AnalyticsStatisticsProps {
  winRate: number;
  totalPnl: number;
  wins: number;
  losses: number;
  profitFactor: number;
  avgWin: number;
  avgLoss: number;
}

export default function AnalyticsStatistics({
  winRate,
  totalPnl,
  wins,
  losses,
  profitFactor,
  avgWin,
  avgLoss,
}: AnalyticsStatisticsProps) {
  return (
    <div
      className="
      grid
      gap-4
      md:grid-cols-4
      xl:grid-cols-7
      mb-6
      "
    >
      <KpiCard
        title="Win Rate"
        value={`${winRate.toFixed(2)}%`}
      />

      <KpiCard
        title="Total P&L"
        value={`$${totalPnl.toFixed(2)}`}
        color={
          totalPnl >= 0
            ? "text-green-500"
            : "text-red-500"
        }
      />

      <KpiCard
        title="Wins"
        value={wins}
      />

      <KpiCard
        title="Losses"
        value={losses}
      />

      <KpiCard
        title="Profit Factor"
        value={profitFactor.toFixed(2)}
      />

      <KpiCard
        title="Avg Win"
        value={`$${avgWin.toFixed(2)}`}
        color="text-green-500"
      />

      <KpiCard
        title="Avg Loss"
        value={`$${avgLoss.toFixed(2)}`}
        color="text-red-500"
      />
    </div>
  );
}