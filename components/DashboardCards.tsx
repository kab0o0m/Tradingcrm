interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: string;
  color?: string;
}

export default function DashboardCard({
  title,
  value,
  change,
  color = "text-gray-900",
}: DashboardCardProps) {
  return (
    <div
      className="
      rounded-xl
      border
      border-gray-200
      bg-white
      px-4
      py-3
      shadow-sm
      "
    >
      <p
        className="
        text-[10px]
        font-semibold
        uppercase
        tracking-wide
        text-gray-400
        "
      >
        {title}
      </p>

      <div className="mt-1 flex items-center justify-between">
        <h2
          className={`
            text-xl
            font-bold
            ${color}
          `}
        >
          {value}
        </h2>

        {change && (
          <span
            className="
            rounded-full
            bg-[#845eed]/10
            px-2
            py-1
            text-[10px]
            font-medium
            text-red-600
            "
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}