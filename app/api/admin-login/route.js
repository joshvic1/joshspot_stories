import { NextResponse } from "next/server";

export async function POST(req) {
  const { password } = await req.json();
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password === correctPassword) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
}
