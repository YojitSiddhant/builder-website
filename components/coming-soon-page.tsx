type ComingSoonPageProps = {
  title: string;
  description?: string;
};

export function ComingSoonPage({
  title,
  description = "This page is being prepared and will be available soon.",
}: ComingSoonPageProps) {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-12">
        <p className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-900">
          Coming Soon
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {["Clean layout", "Easy navigation", "Placeholder content"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-700"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
