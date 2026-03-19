import { ReactNode } from "react";

type Props = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

export default function SectionCard({ title, action, children }: Props) {
  return (
    <section className="cyber-panel cyber-outline rounded-[28px] p-4">
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-white neon-text">{title}</h2>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}
