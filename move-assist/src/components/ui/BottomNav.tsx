"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "ホーム" },
  { href: "/compare", label: "比較" },
  { href: "/schedules", label: "予定" },
  { href: "/nearby", label: "周辺" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-2 py-3 text-center text-xs font-medium ${
                active ? "text-blue-600" : "text-slate-500"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
