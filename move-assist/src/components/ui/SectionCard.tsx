"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "ホーム", icon: "⌂" },
  { href: "/compare", label: "移動比較", icon: "▥" },
  { href: "/nearby", label: "到着後", icon: "⌖" },
  { href: "/schedules", label: "予定", icon: "◫" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-cyan-400/10 bg-slate-950/82 backdrop-blur-2xl">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2 px-3 py-3">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl px-2 py-3 text-center transition ${
                active
                  ? "cyber-btn text-cyan-100"
                  : "border border-transparent bg-white/[0.02] text-cyan-100/55"
              }`}
            >
              <div className="text-base">{item.icon}</div>
              <div className="mt-1 text-[11px] font-medium">{item.label}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
