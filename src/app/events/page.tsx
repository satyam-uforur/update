"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { MatrixBackground } from "@/components/matrix-background";
import GradientAnimatedText from "../../components/GradientAnimatedText";
import Card from "../../components/event-card";
import events from "../../lib/events";
import { DecryptionText } from "@/components/decryption-text";
import useAuth from "../../../hooks/useAuth"; // Confirm this path matches your structure

const Page = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // Use the implemented auth hook

  useEffect(() => {
    // Redirect to sign-in page if not authenticated
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  // If not authenticated, don't render the page content
  if (!isAuthenticated) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pt-20 pb-8">
        {/* Matrix-style animated background */}
        <MatrixBackground />
        <div className="relative z-10 max-w-7xl mx-auto mb-48 min-h-screen">
          <DecryptionText text="EVENTS_ACCESS_GRANTED" className="text-center text-sm text-cyan-400 mb-4" />

          {/* Foreground content */}
          <div className="relative z-10 max-w-7xl mx-auto pt-20 mb-36 px-6">
            {/* Animated Title */}
            <GradientAnimatedText className="mb-10 tracking-tighter xl:text-4xl/none text-center">
              SYSTEM EVENTS
            </GradientAnimatedText>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mx-auto w-fit">
              {events.map((data) => (
                <Link href={`/event/${data.id}`} key={data.id}>
                  <Card title={data.name} tagline={data.Tagline} coverImage={data.logo} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;