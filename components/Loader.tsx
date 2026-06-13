"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [bids, setBids] = useState([
    60, 100, 140, 180, 220,
  ]);

  const [asks, setAsks] = useState([
    220, 180, 140, 100, 60,
  ]);

  const [midPrice, setMidPrice] =
    useState(1.0850);

  useEffect(() => {
    const interval = setInterval(() => {
      setBids(
        Array.from(
          { length: 5 },
          () =>
            Math.floor(
              Math.random() * 180 +
                50
            )
        )
      );

      setAsks(
        Array.from(
          { length: 5 },
          () =>
            Math.floor(
              Math.random() * 180 +
                50
            )
        )
      );

      setMidPrice((prev) => {
        const move =
          (Math.random() - 0.5) *
          0.0003;

        return Number(
          (
            prev + move
          ).toFixed(4)
        );
      });
    }, 400);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div
        className="
        w-[380px]
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-xl
        "
      >
        {/* Logo */}

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[#845eed]">
              1%
            </span>

            <span className="text-gray-900">
              Percent
            </span>
          </h1>

          <p className="mt-1 text-xs text-gray-400">
            Connecting to market...
          </p>
        </div>

        {/* Header */}

        <div
          className="
          mb-3
          flex
          justify-between
          text-xs
          font-semibold
          uppercase
          text-gray-400
          "
        >
          <span>Bids</span>
          <span>Asks</span>
        </div>

        {/* Order Book */}

        <div className="space-y-2">
          {bids.map(
            (bid, index) => (
              <div
                key={index}
                className="
                grid
                grid-cols-2
                gap-3
                "
              >
                {/* Bid */}

                <div
                  className="
                  relative
                  h-7
                  overflow-hidden
                  rounded-lg
                  bg-green-50
                  "
                >
                  <div
                    className="
                    absolute
                    inset-y-0
                    left-0
                    bg-green-500/70
                    transition-all
                    duration-300
                    "
                    style={{
                      width: `${bid}px`,
                    }}
                  />

                  <span
                    className="
                    relative
                    z-10
                    px-2
                    text-xs
                    leading-7
                    text-gray-700
                    "
                  >
                    {(
                      midPrice -
                      (5 -
                        index) *
                        0.0001
                    ).toFixed(4)}
                  </span>
                </div>

                {/* Ask */}

                <div
                  className="
                  relative
                  h-7
                  overflow-hidden
                  rounded-lg
                  bg-red-50
                  "
                >
                  <div
                    className="
                    absolute
                    inset-y-0
                    right-0
                    bg-red-500/70
                    transition-all
                    duration-300
                    "
                    style={{
                      width: `${asks[index]}px`,
                    }}
                  />

                  <span
                    className="
                    relative
                    z-10
                    block
                    px-2
                    text-right
                    text-xs
                    leading-7
                    text-gray-700
                    "
                  >
                    {(
                      midPrice +
                      (index +
                        1) *
                        0.0001
                    ).toFixed(4)}
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        {/* Spread */}

        <div
          className="
          mt-4
          flex
          items-center
          justify-between
          text-xs
          text-gray-400
          "
        >
          <span>Spread</span>
          <span>0.5 pips</span>
        </div>

        {/* Mid Price */}

        <div
          className="
          mt-4
          rounded-xl
          bg-[#845eed]/10
          py-4
          text-center
          "
        >
          <p className="text-xs text-gray-500">
            EURUSD
          </p>

          <p
            className="
            text-2xl
            font-bold
            text-[#845eed]
            "
          >
            {midPrice.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
}