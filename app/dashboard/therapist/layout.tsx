import { getUserFromCookies } from "@/library/middleware";
import { redirect } from "next/navigation";
import React from "react";

export default async function TherepistLayout({ children }: { children: React.ReactNode }) {
  const token = await getUserFromCookies();

  if (!token || token.role !== "therapist") {
    redirect("/login");
  }

  return <>{children}</>;
}
