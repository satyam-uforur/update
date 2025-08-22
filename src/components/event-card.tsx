"use client"

import { cn } from "../lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const Card = ({
  title,
  tagline,
  coverImage,
}: {
  title: string
  tagline: string
  coverImage: string
}) => {
  return (
    <div className="overflow-hidden mx-auto">
      <div className="relative max-w-xs w-full rounded-lg bg-gray-900/80 border border-emerald-400/30 overflow-hidden hover:border-emerald-400/60 transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>

        {/* Card Content */}
        <div
          className={cn(
            "group w-full cursor-pointer overflow-hidden relative h-fit md:h-96 mx-auto flex flex-col justify-between gap-6 py-6 px-4",
          )}
        >
          {/* Image */}
          <div className="relative overflow-hidden rounded border border-emerald-400/30">
            <Image
              src={coverImage || "/placeholder.svg"}
              alt={`cover image for event ${title}`}
              width={1080}
              height={1920}
              className="object-cover h-48 aspect-video"
              priority
            />
          </div>

          {/* Text and Button Container */}
          <div className="flex items-center justify-between gap-4 relative z-50">
            {/* Text */}
            <div className="text flex-1">
              <h1 className="font-bold text-lg md:text-xl uppercase text-emerald-400 font-mono">{title}</h1>
              <p className="font-medium text-xs text-emerald-300/70 font-mono">{tagline}</p>
            </div>

            <Button
              size="sm"
              className="bg-emerald-500/20 hover:bg-emerald-400/30 text-emerald-400 border border-emerald-400/50 px-3 py-1 text-xs font-mono"
            >
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
