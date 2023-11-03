import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.json();

  try {
    const data = await prisma.folder.create({
      data: {
        name: formData.name,
        createdBy: parseInt(formData.createdBy),
      },
    });

    return NextResponse.json({ msg: "success", data: data });
  } catch (error) {
    return NextResponse.json({ msg: "failed", data: error });
  }
}
