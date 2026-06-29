"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseJsonResponse } from "@/lib/http";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "reviewed", label: "Reviewed" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
] as const;

export function VisitStatusActions({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");

  async function updateStatus(nextStatus: string) {
    setIsPending(true);
    setMessage("");

    try {
      const response = await fetch("/api/site-visits", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: nextStatus }),
      });

      const data = await parseJsonResponse<{ error?: string }>(response);

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to update status.");
      }

      setCurrentStatus(nextStatus);
      setMessage("Updated");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Update failed.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <select
        value={currentStatus}
        disabled={isPending}
        onChange={(event) => updateStatus(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium capitalize text-slate-700 outline-none transition focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {message ? (
        <p className="text-xs text-slate-500">{message}</p>
      ) : null}
    </div>
  );
}
