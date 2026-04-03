import userModel from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET({params} : {params : {id : string}}) {
    try{
     const {id} = await params ;
     if(!id) return NextResponse.json({
        message : "Id not exists"
     })

     const isExists = await userModel.findById(id);
     if(!isExists){
        return NextResponse.json({
            message : "Patient not exists, First Login."
        })
     }
     
     const bookings = await userModel.findById(id).populate('booking')


    }
    catch(error ){
      return NextResponse.json({
        message : "Internal Server Error"
      } , {status : 500})
    }
}