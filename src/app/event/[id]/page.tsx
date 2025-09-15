import connectDB from "../../../db";
import Event from "../../../models/event.model";
import mongoose from "mongoose";
import React from "react";
import RegisterSoloButton from "./_components/RegisterSoloButton";
import { redirect } from "next/navigation";
import GroupRegistration from "../../../models/groupRegistration.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import SoloRegistration from "../../../models/soloRegistration.model";
import Image from "next/image";
import BlurFade from "../../../components/magicui/blur-fade";
import GroupRegistrationForm, { EmailOption } from "./_components/GroupForm";
import User from "../../../models/user.model";
import events from "../../../lib/events";
import GradientAnimatedText from "../../../components/GradientAnimatedText";
import { Metadata } from "next";
import UserDetail from "../../../models/userdetails.model";
import EventClient from "./EventClient";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const eventId = params.id;
  
  const currEvent = events.find((event) => event.id === eventId);

  if (!currEvent) {
    return { title: "Event Not Found" };
  }

  return {
    title: `${currEvent.name} | Updates 2k25`,
    description: currEvent.Tagline,
    openGraph: {
      title: currEvent.name,
      description: currEvent.Tagline,
      images: [
        {
          url: currEvent.coverImage,
          width: 1200,
          height: 630,
          alt: currEvent.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: currEvent.name,
      description: currEvent.Tagline,
      images: [currEvent.coverImage],
    },
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
  const eventId = params.id;

  const session = await getServerSession(authOptions);
  if (!session) return redirect("/auth/login");

  // Redirect to Google if the event is "codewinglet"
  if (eventId === "codewinglet") {
    return redirect("https://www.google.com");
  }

  const currEvent = events.find((event) => event.id === eventId);
  if (!currEvent) return redirect("/events");

  await connectDB();

  const userDetails = await UserDetail.findOne({
    userId: new mongoose.Types.ObjectId(session.user.id),
  });
  const isDetailsAvailable = !!userDetails;

  let eventData = await Event.findOne({ name: currEvent.name });

  if (!eventData) {
    eventData = await Event.create({
      name: currEvent.name,
      id: currEvent.id,
      Tagline: currEvent.Tagline,
      coverImage: currEvent.coverImage,
      eventType: currEvent.eventType || "SOLO",
      minMember: currEvent.minMember || 1,
      maxMember: currEvent.maxMember || 1,
      prizePool: currEvent.prizePool || [],
      rounds: currEvent.rounds || [],
      teamSize: currEvent.teamSize,
      date: currEvent.date,
      time: currEvent.time,
      description: currEvent.description,
      facultyCoordinators: currEvent.facultyCoordinators,
      coordinators: currEvent.coordinators || currEvent["co-ordinators"],
      volunteers: currEvent.volunteers,
    });
  }

  let isSoloAlreadyRegistered = false;
  let dataOfMembers: any[] = [];
  let emailOptions: EmailOption[] = [];

  if (eventData.eventType === "SOLO") {
    const alreadyRegistered = await SoloRegistration.find({
      userId: session.user.id,
      eventId: eventData._id,
    });
    isSoloAlreadyRegistered = alreadyRegistered.length > 0;
  }

  if (eventData.eventType === "GROUP") {
    const allRegistration = await GroupRegistration.find({
      eventId: eventData._id,
    });

    const existedUsers = allRegistration.map((gp) => gp.userId);
    const alreadyRegisterIds = [session.user.id, ...existedUsers];

    const userdata = await User.find({
      _id: { $nin: alreadyRegisterIds },
    }).sort({ email: 1 });

    emailOptions = userdata.map((user) => ({
      label: user.email,
      value: user._id.toString(),
    }));

    const data = await GroupRegistration.find({
      userId: session.user.id,
      eventId: eventData._id,
    });

    const groupId = data[0]?.groupId;
    if (groupId) {
      const pipeline = [
        { $match: { groupId: new mongoose.Types.ObjectId(groupId) } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "result",
            pipeline: [{ $project: { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 } }],
          },
        },
        { $addFields: { user: { $first: "$result" } } },
        {
          $project: {
            _id: 0,
            groupId: 0,
            result: 0,
            userId: 0,
            eventId: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
      ];
      dataOfMembers = await GroupRegistration.aggregate(pipeline);
    }
  }

  return (
    <EventClient
      eventData={{
        ...currEvent,                // static config
        ...eventData.toObject(),     // DB event
        _id: eventData._id.toString(),
      }}
      isSoloAlreadyRegistered={isSoloAlreadyRegistered}
      dataOfMembers={dataOfMembers}
      emailOptions={emailOptions}
      isDetailsAvailable={isDetailsAvailable}
    />
  );
};

export default Page;