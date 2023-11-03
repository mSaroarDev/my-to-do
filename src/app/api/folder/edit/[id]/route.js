import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const formData = await req.json();
  const id = params.id;

  try {
    const data = await prisma.folder.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: formData.name,
      },
    });

    return NextResponse.json({ msg: "success", data: data });
  } catch (error) {
    return NextResponse.json({ msg: "failed" });
  }
}
