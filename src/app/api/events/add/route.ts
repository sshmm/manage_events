import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { actor_id, target_id, target_name, location, metadata, action_id } =
    await req.json();

  try {
    const newEvent = await prisma.event.create({
      data: {
        actor_id,
        target_id,
        target_name,
        location,
        metadata,
        action_id,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add new event" },
      { status: 500 }
    );
  }
}
