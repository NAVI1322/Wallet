"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";



export async function p2pTransfer(amount:number, userId:number)
{
const session = await getServerSession(authOptions);



if (!session?.user || !session.user?.id) {
    return {
        message: "Unauthenticated request",
    };
}


const Sender = Number(session.user.id);
const Amount = amount * 100;

try{

    const Receiver = await prisma.user.findFirst({
        where:{
            id:Number(userId)
        }
    })

    if(Sender==Receiver?.id || !Receiver?.id)
    {
        throw new Error ("User Not Found : Transfer Failed");
    }  

   
      

const res =  await prisma.$transaction(async(tx) => {

    // locking a certain row for updating so avoid mutiple request 

    await tx.$queryRaw`Select * FROM "Balance" WHERE "userId" = ${Number(Sender)} FOR UPDATE`
   
    const FromBalance = await tx.balance.findUnique({
        where:{
            userId:Number(Sender)
        }
    });

    

    if(!FromBalance || FromBalance.amount <amount) {
        throw new Error("Insufficient Funds");
    }
    
   
  

      await  tx.balance.update({
            where:{
                userId:Number(Sender)
            },
            data:{
                amount:{
                    decrement:Number(Amount )
                }
            }
    
         }),
    await tx.balance.update({
        where:{
            userId:Number(Receiver.id)
        },
        data:{
            amount:{
                increment:Number(Amount)
            }
        }
     }),

     await tx.p2pTransfer.create({
        data:{
            fromUserId:Number(Sender),
            toUserId:Receiver.id,
            amount:Number(Amount),
            timestamp: new Date(),
        }
     })
})
return { 
    statusCode: 200,
   message: "P2P transfer success",
};

   
}
catch(e)
{
    
    return { 
         statusCode: 400,
        message: "P2P transfer Failed :  with" + e,
    };
}
}