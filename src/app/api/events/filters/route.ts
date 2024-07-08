import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const actors = await prisma.member.findMany({
    select: { id: true },
  });

  const targets = await prisma.event.findMany({
    select: { target_id: true },
    distinct: ["target_id"],
  });

  const actions = await prisma.action.findMany({
    select: { id: true },
  });

  return NextResponse.json({
    actor_ids: actors.map((actor) => actor.id),
    target_ids: targets.map((target) => target.target_id),
    action_ids: actions.map((action) => action.id),
  });
}
