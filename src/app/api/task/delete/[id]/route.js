import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  // const formData = await req.json();
  const id = params.id;

  try {
    const data = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ msg: "success", data: data });
  } catch (error) {
    return NextResponse.json({ msg: "failed" });
  }
}
