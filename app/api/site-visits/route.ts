import { appendSiteVisitRequest, readSiteVisitRequests, validateSiteVisitInput } from "@/lib/site-visits";

export const runtime = "nodejs";

export async function GET() {
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
