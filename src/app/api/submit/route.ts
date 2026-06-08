import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = {
      id: Date.now().toString(),
      trailId: body.trailId,
      trailName: body.trailName,
      date: body.date,
      time: body.time,
      altDate: body.altDate || "",
      altTime: body.altTime || "",
      excitement: body.excitement || 5,
      notes: body.notes || "",
      submittedAt: new Date().toISOString(),
    };

    await storage.addAsync(response);

    return NextResponse.json({ success: true, id: response.id });
  } catch (error) {
    console.error("Error storing response:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save response" },
      { status: 500 }
    );
  }
}
