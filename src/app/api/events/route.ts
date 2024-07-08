import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const fetchEvents = async ({
  skip,
  pageSize,
  filters,
  search,
}: {
  skip: number;
  pageSize: number;
  filters: any;
  search: string;
}) => {
  console.log("filters", filters);
  const events = await prisma.event.findMany({
    where: {
      AND: [
        filters.actor_id ? { actor_id: filters.actor_id } : {},
        filters.target_id ? { target_id: filters.target_id } : {},
        filters.action_id ? { action_id: filters.action_id } : {},
        {
          OR: [
            {
              actor: { actor_name: { contains: search, mode: "insensitive" } },
            },
            { target_name: { contains: search, mode: "insensitive" } },
            { action: { name: { contains: search, mode: "insensitive" } } },
          ],
        },
      ],
    },
    include: {
      actor: true,
      action: true,
    },
    skip,
    take: pageSize,
    orderBy: { occurred_at: "desc" },
  });

  const totalEvents = await prisma.event.count({
    where: {
      AND: [
        filters.actor_id ? { actor_id: filters.actor_id } : {},
        filters.target_id ? { target_id: filters.target_id } : {},
        filters.action_id ? { action_id: filters.action_id } : {},
        {
          OR: [
            {
              actor: { actor_name: { contains: search, mode: "insensitive" } },
            },
            { target_name: { contains: search, mode: "insensitive" } },
            { action: { name: { contains: search, mode: "insensitive" } } },
          ],
        },
      ],
    },
  });
  console.log(totalEvents);
  return { events, totalEvents };
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const search = searchParams.get("search") || "";
    const actor_id = searchParams.get("actor_id");
    const target_id = searchParams.get("target_id");
    const action_id = searchParams.get("action_id");
    console.log(actor_id);
    const filters: any = {};
    if (actor_id) filters.actor_id = actor_id;
    if (target_id) filters.target_id = target_id;
    if (action_id) filters.action_id = action_id;

    const pageSize = 5;
    const skip = (Number(page) - 1) * pageSize;

    const events = await fetchEvents({ pageSize, skip, filters, search });

    return NextResponse.json({ ...events });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
