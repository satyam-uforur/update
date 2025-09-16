import { Schema, models, model, ObjectId } from "mongoose";

export interface IRegistration {
  userId: ObjectId;
  eventId: ObjectId;
  groupMembers: ObjectId[];
}

const registrationSchema = new Schema<IRegistration>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SoloRegistration =
  models.SoloRegistration ||
  model<IRegistration>("SoloRegistration", registrationSchema);

export default SoloRegistration;