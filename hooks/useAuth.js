"use client";

import { useSession } from "next-auth/react";

export default function useAuth() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return { isAuthenticated, user: session?.user };
}