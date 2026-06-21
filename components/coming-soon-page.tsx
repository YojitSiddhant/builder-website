type ComingSoonPageProps = {
  title: string;
};

export function ComingSoonPage({
  title,
}: ComingSoonPageProps) {
  return (
    <section className="flex min-h-[calc(100dvh-8rem)] items-center justify-center bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">
          Coming Soon
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
          Content coming soon.
        </p>
      </div>
    </section>
  );
}
