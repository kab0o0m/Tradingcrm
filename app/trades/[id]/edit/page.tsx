
"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

export default function EditTradePage() {
  const params = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    pair: "",
    direction: "",
    strategy: "",
    session: "",
    risk_amount: 0,
    pnl: 0,
    status: "",
    entry_date: "",
    comments: "",
  });

  useEffect(() => {
    async function fetchTrade() {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `https://tradingcrmbackend-1.onrender.com/trades/${params.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();
      console.log(data)
      setFormData({
        ...data,
        entry_date: data.entry_date
          ? data.entry_date.split("T")[0]
          : "",
      });
    }

    fetchTrade();
  }, [params.id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const token =
      localStorage.getItem("token");

    if (formData.status == "FAIL") {
      formData.pnl = -formData.pnl
    }

    const response = await fetch(
      `https://tradingcrmbackend-1.onrender.com//trades/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    

    if (response.ok) {
      router.push("/trades");
    }
  }

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit Trade
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update your trade details
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="
        max-w-4xl
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        "
      >
        <div className="grid grid-cols-2 gap-6">

          {/* Pair */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Pair
            </label>

            <input
              type="text"
              value={formData.pair}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pair: e.target.value,
                })
              }
              className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Entry Date
            </label>

            <input
              type="date"
              value={formData.entry_date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  entry_date: e.target.value,
                })
              }
              className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              "
            />
          </div>

          {/* Direction */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Direction
            </label>

            <select
              value={formData.direction}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  direction:
                    e.target.value,
                })
              }
              className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              "
            >
              <option value="LONG">
                Long
              </option>

              <option value="SHORT">
                Short
              </option>
            </select>
          </div>

          {/* Session */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Session
            </label>

            <select
              value={formData.session}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  session:
                    e.target.value,
                })
              }
              className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              "
            >
              <option value="LONDON">
                London
              </option>

              <option value="NEWYORK">
                New York
              </option>
            </select>
          </div>

          {/* Status */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status:
                    e.target.value,
                })
              }
              className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              "
            >
              <option value="TRADING">
                Trading
              </option>

              <option value="SUCCESS">
                Success
              </option>

              <option value="FAIL">
                Fail
              </option>

              <option value="EARLY_EXIT">
                Early Exit
              </option>

              <option value="BREAK_EVEN">
                Break Even
              </option>
            </select>
          </div>

          {/* Risk */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Risk Amount
            </label>

            <input
              type="number"
              step="0.01"
              value={
                formData.risk_amount
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  risk_amount:
                    Number(
                      e.target.value
                    ),
                })
              }
              className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              "
            />
          </div>

          {/* PnL */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              PnL
            </label>

            <input
              type="number"
              step="0.01"
              value={formData.pnl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pnl: Number(
                    e.target.value
                  ),
                })
              }
              className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              "
            />
          </div>

        </div>

        {/* Strategy */}

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">
            Strategy
          </label>

          <textarea
            rows={4}
            value={formData.strategy}
            onChange={(e) =>
              setFormData({
                ...formData,
                strategy:
                  e.target.value,
              })
            }
            className="
            w-full
            rounded-xl
            border
            border-gray-200
            px-4
            py-3
            "
          />
        </div>

        {/* Comments */}

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">
            Comments
          </label>

          <textarea
            rows={5}
            value={formData.comments}
            onChange={(e) =>
              setFormData({
                ...formData,
                comments:
                  e.target.value,
              })
            }
            className="
            w-full
            rounded-xl
            border
            border-gray-200
            px-4
            py-3
            "
          />
        </div>

        <button
          type="submit"
          className="
          mt-6
          rounded-xl
          bg-[#845eed]
          px-6
          py-3
          text-white
          transition
          hover:bg-[#7347df]
          cursor-pointer
          "
        >
          Save Changes
        </button>

      </form>
    </div>
  );
}

