export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams?.error;

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-slate-50 px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">
          Owner Access
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
          Admin Login
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Use the owner password to sign in and view the site visit requests.
        </p>

        {error ? (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error === "config"
              ? "Admin credentials are not configured on the server."
              : "Invalid username or password."}
          </div>
        ) : null}

        <form action="/api/admin/login" method="post" className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-blue-400"
              placeholder="Owner password"
            />
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-xs leading-6 text-slate-500">
          For local testing, the default password is <span className="font-semibold text-slate-700">123</span> if you have not set <code>ADMIN_PASSWORD</code>.
        </p>
      </div>
    </div>
  );
}
