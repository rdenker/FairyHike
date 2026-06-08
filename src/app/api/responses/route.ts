import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const responses = await storage.getAllAsync();
    return NextResponse.json({ success: true, responses });
  } catch (error) {
    console.error("Error fetching responses:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch responses" },
      { status: 500 }
    );
  }
}
