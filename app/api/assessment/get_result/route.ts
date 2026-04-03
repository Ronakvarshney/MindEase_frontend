import { connectDB } from "@/config/dbConnect";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    try{
     
        await connectDB();
        const id = await req.headers.get('x-user-id');
        const isExists = await userModel.findOne({_id : id}).select('mental_health_report');

        if(!isExists){
            return NextResponse.json({
                message : "User is not authenticated"
            })
        }

        return NextResponse.json({
            message : "Report result fetches successfully",
            details : isExists.mental_health_report
        })
    }
    catch(error){
        return NextResponse.json({
            message : "Internal Server Error",
            error : error
        })
    }
    
}