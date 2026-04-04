// /dashboard/page.js
"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role === "patient") {
      router.replace("/dashboard/patient");
    } else if (user.role === "therapist") {
      router.replace("/dashboard/therapist");
    } else {
      router.replace("/dashboard/admin");
    }
  }, [user, router]);

  return null;
}
