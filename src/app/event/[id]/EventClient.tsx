// src/app/event/[id]/EventClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { MatrixBackground } from "../../../components/matrix-background";
import { CyberpunkNav } from "../../../components/cyberpunk-nav";
import { DecryptionText } from "../../../components/decryption-text";
import GradientAnimatedText from "../../../components/GradientAnimatedText";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Clock, Users, Calendar, User, GraduationCap } from "lucide-react";
import BlurFade from "../../../components/magicui/blur-fade";
import GroupRegistrationForm, { EmailOption } from "./_components/GroupForm";
import RegisterSoloButton from "./_components/RegisterSoloButton";

interface EventClientProps {
  eventData: {
    _id: string;
    id: string;
    name: string;
    Tagline: string;
    coverImage: string;
    eventType: "SOLO" | "GROUP";
    teamSize: string;
    date: string;
    time: string;
    description?: string;
    minMember?: number;
    maxMember?: number;
    rounds?: { name: string; Rules: string[] }[];
    facultyCoordinators?: { name: string; role: string; image?: string }[];
    coordinators?: { name: string; role: string; image?: string }[];
    volunteers?: { name: string; role: string; image?: string }[];
  };
  isSoloAlreadyRegistered: boolean;
  dataOfMembers: any[];
  emailOptions: EmailOption[];
  isDetailsAvailable: boolean;
}

export default function EventClient({
  eventData,
  isSoloAlreadyRegistered,
  dataOfMembers,
  emailOptions,
  isDetailsAvailable,
}: EventClientProps) {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 mt-20">
        <div className="text-center mb-12">
          <DecryptionText text={eventData.name} className="text-6xl font-bold mb-4" />
          <GradientAnimatedText className="text-xl italic text-cyan-400">
            &quot;{eventData.Tagline}&quot;
          </GradientAnimatedText>
        </div>

        {/* Poster */}
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative border border-cyan-500/30 rounded-lg overflow-hidden">
            <Image
              src={eventData.coverImage || "/placeholder.svg"}
              alt={eventData.name}
              width={1447}
              height={2048}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                  <Users className="w-3 h-3 mr-1" />
                  {eventData.teamSize} Members
                </Badge>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Calendar className="w-3 h-3 mr-1" />
                  {eventData.date}
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  <Clock className="w-3 h-3 mr-1" />
                  {eventData.time}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Event Description */}
            

            {/* Rules Section */}
            <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center justify-between">
                  Rules & Guidelines
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRules(!showRules)}
                    className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    {showRules ? "Hide" : "Show"} Rules
                  </Button>
                </CardTitle>
              </CardHeader>
              {showRules && (
                <CardContent>
                  <div className="space-y-4">
                    {eventData.rounds?.map((round, index) => (
                      <div key={index}>
                        <h4 className="text-green-400 font-semibold mb-2">{round.name}</h4>
                        <ul className="space-y-2">
                          {round.Rules.map((rule, ruleIndex) => (
                            <li key={ruleIndex} className="text-gray-300 flex items-start">
                              <span className="text-cyan-400 mr-2">•</span>
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Team Members Sections */}
            {eventData.facultyCoordinators?.length > 0 && (
              <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Faculty Coordinators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {eventData.facultyCoordinators.map((faculty, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20"
                      >
                        <Image
                          src={faculty.image || "/placeholder.svg"}
                          alt={faculty.name}
                          width={50}
                          height={50}
                          className="rounded-full border-2 border-purple-500/30"
                        />
                        <div>
                          <p className="font-semibold text-white">{faculty.name}</p>
                          <p className="text-sm text-purple-300">{faculty.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {(eventData.coordinators || eventData["co-ordinators"] || [])?.length > 0 && (
              <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Event Coordinators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(eventData.coordinators || eventData["co-ordinators"] || []).map((coordinator, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                      >
                        <Image
                          src={coordinator.image || "/placeholder.svg"}
                          alt={coordinator.name}
                          width={50}
                          height={50}
                          className="rounded-full border-2 border-cyan-500/30"
                        />
                        <div>
                          <p className="font-semibold text-white">{coordinator.name}</p>
                          <p className="text-sm text-cyan-300">{coordinator.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {(eventData.volunteers || [])?.length > 0 && (
              <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Volunteers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {(eventData.volunteers || []).map((volunteer, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                      >
                        <Image
                          src={volunteer.image || "/placeholder.svg"}
                          alt={volunteer.name}
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-green-500/30"
                        />
                        <div>
                          <p className="font-semibold text-white text-sm">{volunteer.name}</p>
                          <p className="text-xs text-green-300">{volunteer.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Registration Section */}
          <div className="space-y-6">
            <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-cyan-400">Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Event Type:</span>
                    <span className="text-white">{eventData.eventType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Team Size:</span>
                    <span className="text-white">{eventData.teamSize}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white">{eventData.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white">{eventData.time}</span>
                  </div>
                </div>

                <BlurFade inView>
                  {eventData.eventType === "SOLO" ? (
                    <div className="flex items-center justify-center">
                      <RegisterSoloButton
                        eventId={eventData._id}
                        isAlredyRegister={isSoloAlreadyRegistered}
                        isDetailsAvailable={isDetailsAvailable}
                      />
                    </div>
                  ) : dataOfMembers.length === 0 ? (
                    <GroupRegistrationForm
                      mini={eventData.minMember}
                      maxi={eventData.maxMember}
                      eventId={eventData._id}
                      emailOptions={emailOptions}
                      isDetailsAvailable={isDetailsAvailable}
                    />
                  ) : (
                    <div className="p-4 w-full bg-gradient-to-br from-red-950/30 to-red-800/30 rounded-lg border border-red-900/70">
                      <p className="italic text-sm text-violet-50/60 mb-4">
                        *You have already registered for this event
                      </p>
                      <h4 className="text-lg font-bold text-white">Team Members:</h4>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {dataOfMembers.map((data) => (
                          <li key={data.user.name} className="flex items-center gap-3 ml-4 mt-0.5">
                            <div>
                              <p>{data.user.name}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </BlurFade>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
