"use client"
import { Card } from "@repo/ui/card"
import { useState } from "react"
import { p2pTransfer } from "../app/lib/action/P2PTransfer"




export function P2pTransferCard()
{

    const [Amount,setAmount] = useState<number>() 
    const [User,setUser] = useState<number>()

    async function HandleTransfer()
    {
        if(Amount!=undefined && User!=undefined){

        const transfer = await p2pTransfer(Amount,User)
        alert(transfer.message);
        }
        else
        {
            alert("Invalid Input");
        }
    }

return <Card title="Send Money">
    <div className="flex flex-col justify-center py-4 px-6 space-y-3">
        <div className="flex flex-col p-1">
            <span className="text-sm font-light">UserId</span>
            <input className="p-2 ring-1 ring-black outline-none rounded text-sm" value={User} type="text" placeholder="UserId" id="UserId" onChange={(e:any)=>setUser(e.target.value)}/>
        </div>
        <div className="flex-col flex  p-1">
            <span className="text-sm font-light">Amount</span>
            <input className="ring-1 ring-black outline-none rounded text-sm p-2"  type="text" placeholder="Amount" id="Amount" value={Amount} onChange={(e:any)=>setAmount(e.target.value)}/>
        </div>
        <button className="rounded text-md hover:bg-gray-500 hover:text-slate-100 bg-gray-400 font-semibold px-3  py-2 " onClick={HandleTransfer}>Send</button>
    </div>
</Card>
}