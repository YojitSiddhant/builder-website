export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams?.error;

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-slate-950 px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
          Owner Access
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          Admin Login
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Sign in with the owner credentials from your environment variables to view and manage site visit requests.
        </p>

        {error ? (
          <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
            {error === "config"
              ? "Admin credentials are not configured on the server."
              : "Invalid username or password."}
          </div>
        ) : null}

        <form action="/api/admin/login" method="post" className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Username</span>
            <input
              name="username"
              type="text"
              autoComplete="username"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-300"
              placeholder="Owner username"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-300"
              placeholder="Owner password"
            />
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
