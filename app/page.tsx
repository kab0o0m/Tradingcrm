
import Link from "next/link";

export default function HomePage() {
  return (
    <div
      className="
      min-h-screen
      bg-white
      "
    >
      {/* Hero */}

      <section
        className="
        mx-auto
        flex
        max-w-7xl
        flex-col
        items-center
        px-6
        py-32
        text-center
        "
      >
        <div
          className="
          mb-4
          rounded-full
          bg-[#845eed]/10
          px-4
          py-2
          text-sm
          font-medium
          text-[#845eed]
          "
        >
          Trading Journal & CRM
        </div>

        <h1
          className="
          max-w-4xl
          text-6xl
          font-bold
          leading-tight
          text-gray-900
          "
        >
          Track Every Trade.
          <br />
          Improve Every Day.
        </h1>

        <p
          className="
          mt-6
          max-w-2xl
          text-lg
          text-gray-600
          "
        >
          A modern trading journal that helps
          traders record trades, monitor
          performance, analyze mistakes and
          build consistency.
        </p>

        <div
          className="
          mt-10
          flex
          gap-4
          "
        >
          <Link
            href="/dashboard"
            className="
            rounded-xl
            bg-[#845eed]
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-[#7347df]
            "
          >
            Open Dashboard
          </Link>

          <Link
            href="/trades"
            className="
            rounded-xl
            border
            border-gray-300
            px-6
            py-3
            font-medium
            text-gray-700
            transition
            hover:bg-gray-50
            "
          >
            View Trades
          </Link>
        </div>
      </section>

      {/* Features */}

      <section
        className="
        mx-auto
        max-w-7xl
        px-6
        pb-24
        "
      >
        <div
          className="
          grid
          gap-6
          md:grid-cols-3
          "
        >
          <div
            className="
            rounded-2xl
            border
            border-gray-200
            p-8
            "
          >
            <h3
              className="
              mb-3
              text-xl
              font-semibold
              "
            >
              Trade Journal
            </h3>

            <p className="text-gray-600">
              Record setups, risk, results
              and trading notes in one place.
            </p>
          </div>

          <div
            className="
            rounded-2xl
            border
            border-gray-200
            p-8
            "
          >
            <h3
              className="
              mb-3
              text-xl
              font-semibold
              "
            >
              Performance Analytics
            </h3>

            <p className="text-gray-600">
              Track win rate, profit & loss,
              account growth and consistency.
            </p>
          </div>

          <div
            className="
            rounded-2xl
            border
            border-gray-200
            p-8
            "
          >
            <h3
              className="
              mb-3
              text-xl
              font-semibold
              "
            >
              Risk Management
            </h3>

            <p className="text-gray-600">
              Monitor risk exposure and stay
              disciplined with your trading
              plan.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer
        className="
        border-t
        border-gray-200
        py-8
        text-center
        text-sm
        text-gray-500
        "
      >
        Built with Next.js, FastAPI and MySQL
      </footer>
    </div>
  );
}

