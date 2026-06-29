import Link from "next/link";
import {
  getVisitPurposeOptions,
  getVisitSlotOptions,
  readSiteVisitRequests,
} from "@/lib/site-visits";
import { requireAdmin } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { VisitStatusActions } from "@/components/visit-status-actions";

export const dynamic = "force-dynamic";

export default async function AdminVisitsPage() {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    redirect("/admin/login");
  }

  const visits = await readSiteVisitRequests();
  const totalVisits = visits.length;
  const newVisits = visits.filter((visit) => visit.status === "new").length;
  const confirmedVisits = visits.filter((visit) => visit.status === "confirmed").length;

  return (
    <div className="bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Internal Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Site Visit Requests
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Every request submitted from the contact page appears here so the team can review preferred dates, time slots, and visitor details.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
            >
              Back to Contact
            </Link>
            <form action="/api/admin/logout" method="post" className="w-fit">
              <button
                type="submit"
                className="inline-flex w-fit items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Sign Out
              </button>
            </form>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Total Requests" value={String(totalVisits)} />
            <StatCard label="New" value={String(newVisits)} />
            <StatCard label="Confirmed" value={String(confirmedVisits)} />
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 shadow-[0_24px_70px_rgba(2,6,23,0.35)]">
          <div className="border-b border-slate-800 px-6 py-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Visit List</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Showing {visits.length} request{visits.length === 1 ? "" : "s"}.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                {getVisitSlotOptions().map((slot) => (
                  <span key={slot} className="rounded-full border border-slate-700 px-3 py-1">
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {visits.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-lg font-medium text-white">No visit requests yet.</p>
              <p className="mt-2 text-sm text-slate-400">
                Once someone books a slot through the contact page, the request will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-800 text-left">
                <thead className="bg-slate-950/60 text-xs uppercase tracking-[0.2em] text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Visitor</th>
                    <th className="px-6 py-4">Visit Schedule</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Purpose</th>
                    <th className="px-6 py-4">Notes</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900 text-sm text-slate-200">
                  {visits.map((visit) => (
                    <tr key={visit.id} className="align-top">
                      <td className="px-6 py-5">
                        <div className="font-semibold text-white">{visit.fullName}</div>
                        <div className="mt-1 text-xs text-slate-400">
                          Guests: {visit.visitors}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          Requested {formatDateTime(visit.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-medium text-white">{formatLongDate(visit.preferredDate)}</div>
                        <div className="mt-1 text-sm text-slate-300">{visit.preferredSlot}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div>{visit.phoneNumber}</div>
                        <div className="mt-1 text-slate-400">{visit.emailAddress}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                          {visit.purpose}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-slate-300">
                        <p className="max-w-md leading-6">{visit.notes}</p>
                      </td>
                      <td className="px-6 py-5">
                        <VisitStatusActions id={visit.id} status={visit.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Visit purposes available: {getVisitPurposeOptions().join(", ")}.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatLongDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
