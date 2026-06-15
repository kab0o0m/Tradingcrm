"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    setLoading(true);

    try {
      const response =
        await fetch(
          "https://tradingcrmbackend-1.onrender.com/register",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Failed to create account"
        );
      }

      router.push("/login");
    } catch (err: any) {
      setError(
        err.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* LEFT */}

      <div
        className="
        hidden
        lg:flex
        w-1/2
        flex-col
        justify-center
        bg-gradient-to-br
        from-[#845eed]
        to-[#6d46df]
        p-16
        text-white
        "
      >

        <img
          src="/Logo.png"
          alt="OnePercent"
          className="h-16 w-16"
        />

        <h1
          className="
          mt-8
          text-6xl
          font-bold
          "
        >
          1%<span className="text-white/70">
            Percent
          </span>
        </h1>

        <p
          className="
          mt-6
          text-2xl
          font-medium
          "
        >
          Trade with
          discipline.
        </p>

        <p
          className="
          mt-3
          max-w-md
          text-lg
          text-white/80
          "
        >
          Journal your
          trades, analyse
          performance and
          build consistency.
        </p>

        <div
          className="
          mt-10
          flex
          gap-4
          "
        >
          <div
            className="
            h-16
            w-4
            rounded
            bg-red-500
            "
          />

          <div
            className="
            h-24
            w-4
            rounded
            bg-white
            "
          />
        </div>

      </div>

      {/* RIGHT */}

      <div
        className="
        flex
        flex-1
        items-center
        justify-center
        p-6
        "
      >
        <div
          className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-8
          shadow-xl
          "
        >
          <h2
            className="
            text-3xl
            font-bold
            cursor-pointer
            "
          >
            Create Account
          </h2>

          <p
            className="
            mt-2
            text-sm
            text-gray-500
            "
          >
            Start your trading
            journey today.
          </p>

          {error && (
            <div
              className="
              mt-4
              rounded-xl
              bg-red-50
              p-3
              text-sm
              text-red-600
              "
            >
              {error}
            </div>
          )}

          <form
            onSubmit={
              handleRegister
            }
            className="
            mt-6
            space-y-4
            "
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              focus:border-[#845eed]
              outline-none
              "
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              focus:border-[#845eed]
              outline-none
              "
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              focus:border-[#845eed]
              outline-none
              "
              required
            />

            <button
              type="submit"
              disabled={
                loading
              }
              className="
              w-full
              rounded-xl
              bg-[#845eed]
              py-3
              font-medium
              text-white
              transition
              hover:bg-[#7347df]
              disabled:opacity-50
              "
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          <div
            className="
            mt-6
            text-center
            text-sm
            text-gray-500
            "
          >
            Already have an
            account?{" "}
            <Link
              href="/login"
              className="
              font-medium
              text-[#845eed]
              hover:underline
              "
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}