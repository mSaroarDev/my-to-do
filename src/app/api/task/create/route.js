import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.json();

  try {
    const folderId = formData.fid;
    const data = await prisma.task.create({
      data: {
        taskName: formData.taskName,
        folderId: folderId,
        createdBy: parseInt(formData.createdBy),
      },
    });

    return NextResponse.json({ msg: "success", data: data });
  } catch (error) {
    return NextResponse.json({ msg: "failed", data: error }, { status: 500 });
  }
}
