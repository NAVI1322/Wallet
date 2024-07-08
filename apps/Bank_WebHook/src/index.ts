import express from "express";
import db from "@repo/db/client";

const app = express();

app.use("/hdfcWebhook", async (req, res) => {
  const { token, userId, amount } = req.body;

  const paymentInfo = {
    token,
    userId,
    amount
  };
  // transtions = both req should be done simuntinously or both should fails

 try{

   await db.$transaction([
    db.balance.update({
        where:{
            userId:userId
        },
        data:{
             amount:{
                increment:paymentInfo.amount,
             }
        }
      }),
     db.onRampTransaction.update({ 
        where:{
            token:token
        },
        data:{  
            status:"Success",
        }
    
      })
    
    
   ]);
      res.status(200).json({
        message:"captured"
      })

 }
 catch(e)
 {
    res.status(411).json({
        message:"request failed"
    })
 }



});
