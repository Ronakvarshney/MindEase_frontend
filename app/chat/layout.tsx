import { getUserFromCookies } from "@/library/middleware";
import { redirect } from "next/navigation";
import React from "react";



export default async function ChatLayout({children} : {children : React.ReactNode}) {


    return <>{children}</>
    
}