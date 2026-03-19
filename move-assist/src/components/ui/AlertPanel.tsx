type Props = {
  title: string;
  detail: string;
};

export default function AlertPanel({ title, detail }: Props) {
  return (
    <section className="rounded-[26px] border border-amber-400/18 bg-amber-400/[0.06] px-4 py-4 shadow-[0_0_18px_rgba(251,191,36,0.08)]">
      <div className="flex items-start gap-3">
        <div className="text-xl text-amber-300">⚠</div>
        <div>
          <p className="text-base font-semibold text-amber-200">{title}</p>
          <p className="mt-1 text-sm text-amber-100/80">{detail}</p>
        </div>
      </div>
    </section>
  );
}
