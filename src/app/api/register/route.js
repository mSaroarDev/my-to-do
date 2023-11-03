import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.json();

    const isUser = await prisma.user.count({
      where: {
        email: formData.email,
      },
    });

    if (isUser > 0) {
      return NextResponse.json({ msg: "failed" }, { status: 406 });
    } else {
      const newUser = await prisma.user.create({
        data: {
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });
      return NextResponse.json(
        { msg: "success", data: newUser },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ msg: "failed", data: "user create failed" });
  }
}
