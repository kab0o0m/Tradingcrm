"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Trades",
      href: "/trades",
    },
  ];

  return (
    <aside
      className="
      fixed
      left-0
      top-0
      h-screen
      w-64
      border-r
      border-gray-200
      bg-white
      "
    >
      <div className="p-6">
  <div className="flex items-center gap-3">

    <img
      src="/Logo.png"
      alt="OnePercent Logo"
      className="
      h-10
      w-10
      object-contain
      "
    />

    <div>
      <h1
        className="
        text-2xl
        font-extrabold
        tracking-tight
        "
      >
        <span className="text-[#845eed]">
          1%
        </span>

        <span className="text-gray-900">
          Percent
        </span>
      </h1>

      <p
        className="
        -mt-1
        text-xs
        tracking-wide
        text-gray-400
        "
      >
        Trading Journal
      </p>
    </div>

  </div>
</div>

      <nav className="px-4">

        {links.map((link) => {

          const active =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                mb-2
                block
                rounded-xl
                px-4
                py-3
                transition

                ${
                  active
                    ? "bg-[#845eed]/10 text-[#845eed] font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {link.name}
            </Link>
          );
        })}

      </nav>
    </aside>
  );
}