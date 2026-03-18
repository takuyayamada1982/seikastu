import { ReactNode } from "react";
import BottomNav from "@/components/ui/BottomNav";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function AppShell({ title, description, children }: Props) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-slate-50 safe-area-top safe-area-bottom">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="px-4 py-4">
          <p className="text-xs font-medium text-slate-500">MoveAssist</p>
          <h1 className="mt-1 text-xl font-bold text-slate-900">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          ) : null}
        </div>
      </header>

      <main className="flex-1 px-4 py-4 pb-24">{children}</main>

      <BottomNav />
    </div>
  );
}
