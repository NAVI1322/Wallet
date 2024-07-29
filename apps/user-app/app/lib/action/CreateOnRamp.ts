"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function CreateOnRamping(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request",
        };
    }

    try {

        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const res = await prisma.onRampTransaction.create({
            data: {
                provider,
                status: "Processing",
                startTime: new Date(),
                token: token,
                userId: Number(session.user.id),
                amount: amount * 100, 
            },
        });

        console.log(res)
        if (res) {
            return {
                message: "CreateOnRamp success",
            };
        } else {
            throw new Error("CreateOnRamp Failed");
        }
    } catch (e: any) {
        return {
            message: e.message || "CreateOnRamp Failed",
        };
    }
}