"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
    comments: "",
  });

  useEffect(() => {

    async function fetchTrade() {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/trades/${params.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      setFormData(data);
    }

    fetchTrade();

  }, [params.id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:8000/trades/${params.id}`,
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
    <div className="p-10">

      <h1 className="mb-6 text-3xl font-bold">
        Edit Trade
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex max-w-lg flex-col gap-4"
      >

        <input
          value={formData.pair}
          onChange={(e) =>
            setFormData({
              ...formData,
              pair: e.target.value,
            })
          }
          className="border p-2"
        />

        <input
          value={formData.direction}
          onChange={(e) =>
            setFormData({
              ...formData,
              direction: e.target.value,
            })
          }
          className="border p-2"
        />

        <input
          value={formData.strategy}
          onChange={(e) =>
            setFormData({
              ...formData,
              strategy: e.target.value,
            })
          }
          className="border p-2"
        />

        <input
          value={formData.session}
          onChange={(e) =>
            setFormData({
              ...formData,
              session: e.target.value,
            })
          }
          className="border p-2"
        />

        <input
          type="number"
          value={formData.risk_amount}
          onChange={(e) =>
            setFormData({
              ...formData,
              risk_amount:
                Number(e.target.value),
            })
          }
          className="border p-2"
        />

        <input
          type="number"
          value={formData.pnl}
          onChange={(e) =>
            setFormData({
              ...formData,
              pnl:
                Number(e.target.value),
            })
          }
          className="border p-2"
        />

        <input
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value,
            })
          }
          className="border p-2"
        />

        <textarea
          value={formData.comments}
          onChange={(e) =>
            setFormData({
              ...formData,
              comments: e.target.value,
            })
          }
          className="border p-2"
        />

        <button
          type="submit"
          className="rounded bg-blue-500 p-2 text-white"
        >
          Save Trade
        </button>

      </form>

    </div>
  );
}