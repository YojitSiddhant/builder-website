import {
  appendSiteVisitRequest,
  readSiteVisitRequests,
  type SiteVisitStatus,
  updateSiteVisitStatus,
  validateSiteVisitInput,
} from "@/lib/site-visits";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const visits = await readSiteVisitRequests();
  return Response.json({ visits });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const validation = validateSiteVisitInput(payload);
  if (!validation.ok) {
    return Response.json({ error: validation.message }, { status: 400 });
  }

  const visit = await appendSiteVisitRequest(validation.data);

  return Response.json(
    {
      visit,
      message: "Your site visit request has been sent.",
    },
    { status: 201 },
  );
}

export async function PATCH(request: Request) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: { id?: string; status?: string };

  try {
    payload = (await request.json()) as { id?: string; status?: string };
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!payload.id || !payload.status) {
    return Response.json({ error: "Request id and status are required." }, { status: 400 });
  }

  if (!isValidStatus(payload.status)) {
    return Response.json({ error: "Invalid status." }, { status: 400 });
  }

  const visit = await updateSiteVisitStatus(payload.id, payload.status as SiteVisitStatus);
  if (!visit) {
    return Response.json({ error: "Visit request not found." }, { status: 404 });
  }

  return Response.json({ visit, message: "Visit status updated." });
}

function isValidStatus(status: string) {
  return ["new", "reviewed", "confirmed", "completed"].includes(status);
}
