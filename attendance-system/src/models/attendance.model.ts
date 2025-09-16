import { Schema, models, model, ObjectId } from "mongoose";

export interface IAttendance {
  eventId: ObjectId;
  userId: ObjectId;
  groupId?: ObjectId;
  entryTime?: Date;
  exitTime?: Date;
  status: 'PRESENT' | 'ABSENT' | 'PARTIAL';
}

const attendanceSchema = new Schema<IAttendance>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: false,
    },
    entryTime: {
      type: Date,
      default: null,
    },
    exitTime: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['PRESENT', 'ABSENT', 'PARTIAL'],
      default: 'ABSENT',
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = models.Attendance || model<IAttendance>("Attendance", attendanceSchema);

export default Attendance;