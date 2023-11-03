import prisma from "@/lib/db";
import { SetCookie } from "@/utils/SetCookie";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.json();
    const { id, email, password } = formData;

    const isUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!isUser) {
      return NextResponse.json(
        { msg: "failed", data: "no user found" },
        { status: 401 }
      );
    } else if (isUser && isUser.password !== password) {
      return NextResponse.json(
        { msg: "failed", data: "invalid credentials" },
        { status: 401 }
      );
    } else if (isUser && isUser.password === password) {
      const cookie = await SetCookie(isUser.id, isUser.fullName, isUser.email);
      return NextResponse.json(
        { msg: "success", data: "login success" },
        { status: 200, headers: cookie }
      );
    }
  } catch (error) {
    return NextResponse.json({ msg: "failed", data: "user create failed" });
  }
}
