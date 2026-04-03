"use client"

import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";


export default function Page() {
  const { user } = useAuthStore();

  if (!user) {
    redirect("/login");
  }

  const { role } = user;

  if (role === "admin") {
    redirect("/dashboard/admin");
  }

  if (role === "patient") {
    redirect("/dashboard/patient");
  }

  if (role === "therapist") {
    redirect("/dashboard/therapist");
  }

  return <div> Page</div>;
}
