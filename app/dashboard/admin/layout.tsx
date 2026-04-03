import { getUserFromCookies } from "@/library/middleware";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = await getUserFromCookies();

  if (!token || token.role !== "admin") {
    redirect("/login");
  }

  return <>{children}</>;
}
