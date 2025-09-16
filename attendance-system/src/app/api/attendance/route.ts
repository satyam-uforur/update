import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db";
import Attendance from "@/models/attendance.model";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { eventId, userId, groupId, type } = await request.json();
    
    // Find existing attendance record
    let attendance = await Attendance.findOne({
      eventId: new mongoose.Types.ObjectId(eventId),
      userId: new mongoose.Types.ObjectId(userId),
    });

    const currentTime = new Date();

    if (!attendance) {
      // Create new attendance record
      attendance = await Attendance.create({
        eventId: new mongoose.Types.ObjectId(eventId),
        userId: new mongoose.Types.ObjectId(userId),
        groupId: groupId ? new mongoose.Types.ObjectId(groupId) : undefined,
        entryTime: type === "entry" ? currentTime : null,
        exitTime: type === "exit" ? currentTime : null,
        status: type === "entry" ? "PRESENT" : "ABSENT",
      });
    } else {
      // Update existing record
      if (type === "entry") {
        attendance.entryTime = currentTime;
        attendance.status = "PRESENT";
      } else if (type === "exit") {
        attendance.exitTime = currentTime;
        if (attendance.entryTime) {
          attendance.status = "PRESENT";
        } else {
          attendance.status = "PARTIAL";
        }
      }
      await attendance.save();
    }

    return NextResponse.json({
      success: true,
      message: `${type === "entry" ? "Entry" : "Exit"} recorded successfully`,
      attendance,
    });
  } catch (error) {
    console.error("Error recording attendance:", error);
    return NextResponse.json(
      { success: false, message: "Failed to record attendance" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    
    if (!eventId) {
      return NextResponse.json(
        { success: false, message: "Event ID is required" },
        { status: 400 }
      );
    }

    const attendanceRecords = await Attendance.find({
      eventId: new mongoose.Types.ObjectId(eventId),
    })
    .populate("userId", "name email")
    .populate("groupId")
    .sort({ createdAt: 1 });

    return NextResponse.json({
      success: true,
      attendance: attendanceRecords,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}