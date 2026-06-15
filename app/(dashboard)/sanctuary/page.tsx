
"use client";

import { useEffect, useState } from "react";

const quotes = [
  "Protect your capital first.",
  "The market rewards discipline, not prediction.",
  "Missed trades are better than bad trades.",
  "Focus on process, not profits.",
  "One trade does not define you.",
  "Consistency beats intensity.",
];

export default function MeditationPage() {
  const [secondsLeft, setSecondsLeft] =
    useState(180);

  const [isRunning, setIsRunning] =
    useState(false);

  const [phase, setPhase] =
    useState("Breathe In");

  const [quote, setQuote] =
    useState(quotes[0]);

  const [checklist, setChecklist] =
    useState({
      strategy: false,
      risk: false,
      emotions: false,
    });

  useEffect(() => {
    setQuote(
      quotes[
        Math.floor(
          Math.random() *
            quotes.length
        )
      ]
    );
  }, []);

  useEffect(() => {
    if (
      !isRunning ||
      secondsLeft <= 0
    )
      return;

    const timer =
      setInterval(() => {
        setSecondsLeft(
          (prev) => prev - 1
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [
    isRunning,
    secondsLeft,
  ]);

  useEffect(() => {
    const phases = [
      "Breathe In",
      "Hold",
      "Breathe Out",
      "Hold",
    ];

    let index = 0;

    const interval =
      setInterval(() => {
        index =
          (index + 1) %
          phases.length;

        setPhase(
          phases[index]
        );
      }, 4000);

    return () =>
      clearInterval(interval);
  }, []);

  const minutes = String(
    Math.floor(secondsLeft / 60)
  ).padStart(2, "0");

  const seconds = String(
    secondsLeft % 60
  ).padStart(2, "0");

  return (
    <div className="p-8 max-w-5xl mx-auto">

      {/* Header */}

      <div className="mb-10 text-center">
        <h1
          className="
          text-5xl
          font-bold
          bg-gradient-to-r
          from-blue-500
          to-purple-500
          bg-clip-text
          text-transparent
          "
        >
          Meditation
        </h1>

        <p
          className="
          mt-3
          text-gray-500
          text-lg
          "
        >
          Calm your mind before
          entering the market.
        </p>
      </div>

      <div
        className="
        grid
        lg:grid-cols-2
        gap-6
        "
      >

        {/* Breathing */}

        <div
          className="
          rounded-3xl
          bg-white
          border
          border-gray-200
          shadow-sm
          p-8

          flex
          flex-col
          items-center
          justify-center
          "
        >
          <div
            className={`
            w-56
            h-56
            rounded-full

            bg-gradient-to-br
            from-blue-500
            to-purple-600

            shadow-2xl

            flex
            items-center
            justify-center

            text-white
            text-xl
            font-bold

            transition-all
            duration-[4000ms]

            ${
              phase ===
              "Breathe In"
                ? "scale-125"
                : phase ===
                  "Breathe Out"
                ? "scale-90"
                : "scale-100"
            }
            `}
          >
            {phase}
          </div>

          <p
            className="
            mt-8
            text-gray-500
            "
          >
            Follow the circle
            and breathe slowly.
          </p>
        </div>

        {/* Timer */}

        <div
          className="
          rounded-3xl
          bg-white
          border
          border-gray-200
          shadow-sm
          p-8
          "
        >
          <h2
            className="
            text-xl
            font-semibold
            mb-6
            "
          >
            Meditation Timer
          </h2>

          <div
            className="
            flex
            gap-2
            mb-8
            flex-wrap
            "
          >
            {[1, 3, 5, 10].map(
              (mins) => (
                <button
                  key={mins}
                  onClick={() =>
                    setSecondsLeft(
                      mins * 60
                    )
                  }
                  className="
                  px-5
                  py-3
                  rounded-full

                  bg-gray-100
                  hover:bg-gray-200

                  font-medium
                  transition
                  "
                >
                  {mins}m
                </button>
              )
            )}
          </div>

          <div
            className="
            text-7xl
            font-black
            text-center
            tracking-wider
            mb-8
            "
          >
            {minutes}:
            {seconds}
          </div>

          <div
            className="
            flex
            gap-3
            justify-center
            "
          >
            <button
              onClick={() =>
                setIsRunning(true)
              }
              className="
              rounded-full

              bg-gradient-to-r
              from-green-500
              to-emerald-500

              px-8
              py-3

              font-semibold
              text-white

              shadow-lg
              hover:scale-105
              transition
              "
            >
              Start
            </button>

            <button
              onClick={() =>
                setIsRunning(false)
              }
              className="
              rounded-full

              bg-gradient-to-r
              from-red-500
              to-rose-500

              px-8
              py-3

              font-semibold
              text-white

              shadow-lg
              hover:scale-105
              transition
              "
            >
              Stop
            </button>
          </div>
        </div>

      </div>


    </div>
  );
}

