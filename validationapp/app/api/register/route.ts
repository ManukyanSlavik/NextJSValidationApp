import { NextRequest, NextResponse } from "next/server";
import { schema } from "../users/schema";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = await schema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json(parsed.error.issues, { status: 400 });

  const { email, name, password } = parsed.data;

  if (
    !(await prisma.user.findUnique({ where: { email: parsed.data.email } }))
  ) {
    await prisma.user.create({
      data: { email, name, passwordHash: await bcrypt.hash(password, 12) },
    });
    return NextResponse.json("User successfully registered.", { status: 201 });
  }

  return NextResponse.json("User already exists.", { status: 400 });
}

// TODO: add session based logic.
// TODO: properly implement middleware.
