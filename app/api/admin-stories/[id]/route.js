import dbConnect from "@/lib/dbConnect";
import Story from "@/models/Story";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
  await dbConnect();
  await Story.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { isFeatured } = await req.json();
  await Story.findByIdAndUpdate(params.id, { isFeatured });
  return NextResponse.json({ success: true });
}
