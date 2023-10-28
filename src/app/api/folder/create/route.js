import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.json();

  try {
    const data = await prisma.folder.create({
      data: {
        name: formData.name,
        createdBy: 2,
      },
    });

    return NextResponse.json({ msg: "success", data: data });
  } catch (error) {
    return NextResponse.json({ msg: "failed" });
  }
}
