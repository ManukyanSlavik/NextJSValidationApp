import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/app/services/userService";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await registerUser(body);
  if (!res.success) return NextResponse.json(res.errors, { status: 400 });

  return NextResponse.json("User created successfully", { status: 201 });
}

// TODO: add session based logic.
// TODO: properly implement middleware.
