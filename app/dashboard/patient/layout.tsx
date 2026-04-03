"use client";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";
import React from "react";

export default function PaitentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { user } = useAuthStore();

  // if (!user || user.role !== "patient") {
  //   redirect("/login");
  // }

  return <>{children}</>;
}
