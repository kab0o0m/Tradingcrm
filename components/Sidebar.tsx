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
    {
      name: "New Trade",
      href: "/trades/new",
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

        <h1
          className="
          text-2xl
          font-bold
          text-[#845eed]
          "
        >
          Trade CRM
        </h1>

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