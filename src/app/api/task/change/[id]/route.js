// import prisma from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const formData = await req.json();
  const id = params.id;
  const prisma = new PrismaClient();

  try {
    const updatedValue = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: formData.status,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json(
      { msg: "success", data: updatedValue },
      { status: 200 }
    );
  } catch (error) {
    await prisma.$disconnect();
    return NextResponse.json({ msg: "failed", data: error }, { status: 406 });
  }
}
