import { ReactNode } from "react";
import BottomNav from "@/components/ui/BottomNav";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function AppShell({ title, description, children }: Props) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col text-cyan-50 safe-area-top safe-area-bottom">
      <header className="sticky top-0 z-30 border-b border-cyan-400/10 bg-slate-950/78 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300/80 neon-text">
            MoveAssist
          </p>
          <h1 className="mt-1 text-xl font-bold text-white neon-text">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-cyan-100/70">{description}</p>
          ) : null}
        </div>
      </header>

      <main className="mx-auto flex-1 w-full max-w-md px-4 py-4 pb-28">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
