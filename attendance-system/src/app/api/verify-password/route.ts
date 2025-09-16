import { NextRequest, NextResponse } from "next/server";
import { getEventPassword } from "@/lib/eventPasswords";

export async function POST(request: NextRequest) {
  try {
    const { eventName, password } = await request.json();
    
    const correctPassword = getEventPassword(eventName);
    
    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}