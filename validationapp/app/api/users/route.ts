import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { getAllUsers } from "@/app/services/userService";

export async function GET(request: NextRequest) {
  return NextResponse.json(await getAllUsers());
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      passwordHash: await bcrypt.hash(body.passwordHash, 12),
    },
  });

  return NextResponse.json(user, { status: 201 });
}
