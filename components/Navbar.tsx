"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <nav className="flex items-center justify-between border-b p-4">

      <div className="text-xl font-bold">
        Trade CRM
      </div>

      <div className="flex gap-6">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/trades">
          Trades
        </Link>

        <button
          onClick={handleLogout}
          className="cursor-pointer"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}