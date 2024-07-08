import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const fetchEvents = async ({ filters }: { filters: any }) => {
  console.log(filters);
  const events = await prisma.event.findMany({
    where: {
      ...filters,
    },
    include: {
      actor: true,
      action: true,
    },
    orderBy: { occurred_at: "desc" },
  });

  return { events };
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const actor_id = searchParams.get("actor_id");
    const target_id = searchParams.get("target_id");
    const action_id = searchParams.get("action_id");
    const filters: any = {};
    if (actor_id) filters.actor_id = actor_id;
    if (target_id) filters.target_id = target_id;
    if (action_id) filters.action_id = action_id;

    const events = await fetchEvents({ filters });

    return NextResponse.json({ ...events });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
