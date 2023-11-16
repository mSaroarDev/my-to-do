import prisma from "@/lib/db";
// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const formData = await req.json();
  //   const id = params.id;
  //   const prisma = new PrismaClient();

  try {
    const data = await prisma.task.deleteMany({
      where: {
        folderId: parseInt(formData.fid),
      },
    });

    return NextResponse.json({ msg: "success", data: data });
  } catch (error) {
    return NextResponse.json({ msg: "failed" });
  }
}
