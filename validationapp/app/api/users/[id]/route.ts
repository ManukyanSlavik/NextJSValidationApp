import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: await params.id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: await params.id },
  });
  const body = await request.json();

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
      passwordHash: await bcrypt.hash(body.passwordHash, 12),
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: await params.id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const deletedUser = await prisma.user.delete({
    where: { id: user.id },
  });

  return NextResponse.json(deletedUser, { status: 200 });
}
