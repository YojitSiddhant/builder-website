type ComingSoonPageProps = {
  title: string;
};

export function ComingSoonPage({
  title,
}: ComingSoonPageProps) {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
          Coming Soon
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">Content coming soon.</p>
      </div>
    </section>
  );
}
