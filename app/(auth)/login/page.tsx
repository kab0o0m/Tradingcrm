"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://tradingcrmbackend-1.onrender.com/login",
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
            "Invalid credentials"
        );
      }

      localStorage.setItem(
        "token",
        data.access_token
      );

      router.push(
        "/dashboard"
      );
    } catch (err: any) {
      setError(
        err.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* LEFT SIDE */}

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

      {/* RIGHT SIDE */}

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
            text-gray-900
            "
          >
            Welcome Back
          </h2>

          <p
            className="
            mt-2
            text-sm
            text-gray-500
            "
          >
            Sign in to your
            account
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
              handleLogin
            }
            className="
            mt-6
            space-y-4
            "
          >

            <div>

              <label
                className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
                "
              >
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="john@email.com"
                className="
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
                outline-none
                transition
                focus:border-[#845eed]
                "
                required
              />

            </div>

            <div>

              <label
                className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
                "
              >
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="••••••••"
                className="
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
                outline-none
                transition
                focus:border-[#845eed]
                "
                required
              />

            </div>

            <div
              className="
              flex
              justify-end
              "
            >
              <Link
                href="/forgot-password"
                className="
                text-sm
                text-[#845eed]
                hover:underline
                "
              >
                Forgot Password?
              </Link>
            </div>

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
                ? "Signing In..."
                : "Sign In"}
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
            Don't have an
            account?{" "}

            <Link
              href="/register"
              className="
              font-medium
              text-[#845eed]
              hover:underline
              "
            >
              Create Account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}