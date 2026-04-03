import { redirect } from "next/navigation";
import React from "react";

export default async function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUserFromCookies();
  // console.log(user)
  // if (user && user.role != "patient") {
  //   return redirect("/");
  // }
  // else if(!user) return redirect('/')
  return <>{children}</>;
}
