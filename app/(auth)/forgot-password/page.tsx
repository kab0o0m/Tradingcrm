"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess(false);
    setLoading(true);

    try {

      // Replace with backend endpoint later

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            1000
          )
      );

      setSuccess(true);

    } catch {

      setError(
        "Unable to send reset email."
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

        <h1
          className="
          text-6xl
          font-bold
          "
        >
          OnePercent
        </h1>

        <p
          className="
          mt-6
          text-2xl
          font-medium
          "
        >
          Reset your password.
        </p>

        <p
          className="
          mt-3
          max-w-md
          text-lg
          text-white/80
          "
        >
          Enter your email and
          we'll send instructions
          to regain access to
          your account.
        </p>

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
            text-gray-900
            "
          >
            Forgot Password
          </h2>

          <p
            className="
            mt-2
            text-sm
            text-gray-500
            "
          >
            Enter your email to
            receive a reset link.
          </p>

          {success && (
            <div
              className="
              mt-4
              rounded-xl
              bg-green-50
              p-3
              text-sm
              text-green-700
              "
            >
              If an account exists,
              a password reset email
              has been sent.
            </div>
          )}

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
              handleSubmit
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
                ? "Sending..."
                : "Send Reset Link"}
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
            Remember your password?{" "}

            <Link
              href="/login"
              className="
              font-medium
              text-[#845eed]
              hover:underline
              "
            >
              Back to Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}