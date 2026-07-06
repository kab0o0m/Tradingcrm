"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface AnalyticsFiltersProps {
  dateFilter: string;
  setDateFilter: (value: string) => void;

  customStartDate: string;
  setCustomStartDate: (value: string) => void;

  customEndDate: string;
  setCustomEndDate: (value: string) => void;
}

export default function AnalyticsFilters({
  dateFilter,
  setDateFilter,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
}: AnalyticsFiltersProps) {
  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Filters
      </h2>

      <div className="flex flex-wrap items-end gap-4">

        {/* Time Range */}

        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Time Range
          </label>

          <select
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(e.target.value)
            }
            className="
              appearance-none
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-3
              pr-10
              text-sm
              focus:border-[#845eed]
              focus:outline-none
            "
          >
            <option value="ALL">All Time</option>
            <option value="WEEK">Past Week</option>
            <option value="30D">Past 30 Days</option>
            <option value="MONTH">This Month</option>
            <option value="CUSTOM">
              Custom Range
            </option>
          </select>

          <ChevronDownIcon
            className="
              pointer-events-none
              absolute
              right-3
              top-[42px]
              h-4
              w-4
              text-gray-400
            "
          />
        </div>

        {/* Custom Dates */}

        {dateFilter === "CUSTOM" && (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                From
              </label>

              <input
                type="date"
                value={customStartDate}
                onChange={(e) =>
                  setCustomStartDate(
                    e.target.value
                  )
                }
                className="
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  focus:border-[#845eed]
                  focus:outline-none
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                To
              </label>

              <input
                type="date"
                value={customEndDate}
                onChange={(e) =>
                  setCustomEndDate(
                    e.target.value
                  )
                }
                className="
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  focus:border-[#845eed]
                  focus:outline-none
                "
              />
            </div>
          </>
        )}

      </div>

    </div>
  );
}