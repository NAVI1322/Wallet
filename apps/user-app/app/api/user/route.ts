import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
    const session = await getServerSession(authOptions);
   try{
    if (session.user) {
        return NextResponse.json({
            user: session.user
        })
    }
   }
   catch(e:any)
{
    return NextResponse.json({
        message: "You are not logged in",
        error:e.message
    }, {
        status: 403
    })
}
  
}   