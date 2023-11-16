import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req) {
  const formData = await req.json();

  try {
    const data = await prisma.folder.create({
      data: {
        name: formData.name,
        createdBy: formData.createdBy,
      },
    });

    return NextResponse.json({ msg: "success", data: data });
  } catch (error) {
    return NextResponse.json({ msg: "failed", data: error }, { status: 500 });
  }
}
