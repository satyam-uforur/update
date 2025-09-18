"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export function CyberScheduleSection() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const scheduleData = {
    friday: {
      date: "FRIDAY 19/09/2025",
      events: [
        {
          time: "08:45 A.M. - 09:30 A.M.",
          event: "OPENING\nCEREMONY",
          borderColor: "border-purple-400",
          id: "opening",
        },
        {
          time: "09:30 A.M. - 10:30 A.M.",
          event: "CODE RELAY\nCO PHASE (1,2)",
          borderColor: "border-blue-400",
          id: "code-relay",
        },
        {
          time: "10:30 A.M. - 11:30 A.M.",
          event: "TECH LADDER\nROUND (1)\nC-201",
          borderColor: "border-purple-400",
          id: "tech-ladder",
        },
        {
          time: "11:30 A.M. - 12:00 P.M.",
          event: "CYBER CHASE\nC-203, C-204",
          borderColor: "border-pink-400",
          id: "cyber-chase",
        },
        {
          time: "12:00 P.M. - 01:00 P.M.",
          event: "CODE WINGLET\nCO PHASE (1, 2, 3)",
          borderColor: "border-cyan-400",
          id: "code-winglet-1",
        },
        {
          time: "01:00 P.M. - 01:30 P.M.",
          event: "L\nU\nN\nC\nH",
          borderColor: "border-yellow-400",
          id: "lunch",
        },
        {
          time: "01:30 P.M. - 02:30 P.M.",
          event: "CODE WINGLET\nCO PHASE (1, 2)",
          borderColor: "border-cyan-300",
          id: "code-winglet-2",
        },
        {
          time: "02:30 P.M. - 03:30 P.M.",
          event: "DECODE\n&\nDASH\nROUND (1)\nC-203, C-204",
          borderColor: "border-purple-300",
          id: "decode-dash",
        },
        {
          time: "03:30 P.M. - 04:30 P.M.",
          event: "STOCK X STAKE\nROUND (1)\nC-202, C-203,\nC-204",
          borderColor: "border-indigo-400",
          id: "stock-stake",
        },
      ],
    },
    saturday: {
      date: "SATURDAY 20/09/2025",
      events: [
        {
          time: "09:00 A.M. - 10:00 A.M.",
          event: "HUMAN OR AI\nROUND (2)\nCO PHASE (3)",
          borderColor: "border-blue-400",
          id: "human-ai",
        },
        {
          time: "10:00 A.M. - 11:00 A.M.",
          event: "DECODE\n&\nDASH\nROUND (2)\nC-204",
          borderColor: "border-purple-400",
          id: "decode-dash-2",
        },
        {
          time: "11:00 A.M. - 12:00 P.M.",
          event: "MEME FEST\nROUND (1)\nC-203, C-204",
          borderColor: "border-blue-300",
          id: "meme-fest",
        },
        {
          time: "12:00 P.M. - 01:00 P.M.",
          event: "TECH LADDER\nROUND (2)\nCO PHASE (1,2)",
          borderColor: "border-yellow-300",
          id: "tech-ladder-2",
        },
        {
          time: "01:00 P.M. - 01:30 P.M.",
          event: "B\nR\nE\nA\nK",
          borderColor: "border-yellow-400",
          id: "break",
        },
        {
          time: "01:30 P.M. - 02:30 P.M.",
          event: "STOCK X STAKE\nROUND (2)\nC-202",
          borderColor: "border-indigo-300",
          id: "stock-stake-2",
        },
        {
          time: "02:30 P.M. - 03:30 P.M.",
          event: "CINEVERSE\nROUND (2)\nC-202",
          borderColor: "border-blue-200",
          id: "cineverse",
        },
        {
          time: "03:00 P.M. - 05:00 P.M.",
          event: "VALEDICTORY\nCEREMONY\n\nNJ SEMINAR HALL",
          borderColor: "border-purple-400",
          id: "valedictory",
        },
      ],
    },
  }

  const handleEventClick = (eventId: string) => {
    setSelectedEvent(selectedEvent === eventId ? null : eventId)
  }

  return (
    <section className="py-20 px-4 relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10" />
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
         
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-green-400 to-cyan-400 bg-clip-text text-transparent mb-6 font-mono tracking-wider">
            CYBER SCHEDULE
          </h1>
          <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-2xl font-bold py-4 rounded-lg mb-8 border border-cyan-400/50 shadow-lg shadow-cyan-400/20">
            UPDATES 2K25
          </div>
        </div>

        <div className="space-y-12">
          {/* Friday Schedule */}
          <div className="bg-gray-900/80 rounded-lg p-6 border border-cyan-400/30 backdrop-blur-sm shadow-lg shadow-cyan-400/10">
            <div className="text-cyan-400 font-bold text-xl mb-4 font-mono flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              {scheduleData.friday.date}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-9 gap-2">
              {scheduleData.friday.events.map((event, index) => (
                <Card
                  key={index}
                  className={`bg-gray-900/60 text-cyan-100 border-2 ${event.borderColor} min-h-[120px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-800/80 ${
                    selectedEvent === event.id ? "ring-2 ring-cyan-400 scale-105 bg-gray-800/80" : ""
                  }`}
                  onClick={() => handleEventClick(event.id)}
                >
                  <CardContent className="p-3 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-cyan-400/50"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-cyan-400/50"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-cyan-400/50"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-cyan-400/50"></div>

                    <div className="text-xs font-bold mb-2 text-cyan-300 font-mono">{event.time}</div>
                    <div className="text-xs whitespace-pre-line font-semibold text-white">{event.event}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Saturday Schedule */}
          <div className="bg-gray-900/80 rounded-lg p-6 border border-cyan-400/30 backdrop-blur-sm shadow-lg shadow-cyan-400/10">
            <div className="text-cyan-400 font-bold text-xl mb-4 font-mono flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              {scheduleData.saturday.date}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2">
              {scheduleData.saturday.events.map((event, index) => (
                <Card
                  key={index}
                  className={`bg-gray-900/60 text-cyan-100 border-2 ${event.borderColor} min-h-[120px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-800/80 ${
                    selectedEvent === event.id ? "ring-2 ring-cyan-400 scale-105 bg-gray-800/80" : ""
                  }`}
                  onClick={() => handleEventClick(event.id)}
                >
                  <CardContent className="p-3 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-cyan-400/50"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-cyan-400/50"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-cyan-400/50"></div>

                    <div className="text-xs font-bold mb-2 text-cyan-300 font-mono">{event.time}</div>
                    <div className="text-xs whitespace-pre-line font-semibold text-white">{event.event}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default CyberScheduleSection
