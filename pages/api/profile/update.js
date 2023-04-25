// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getSession } from "next-auth/react";
import { cookies } from 'next/headers'


export default async function handler(req, res) {
    const data = req.body.user
    const sessionToken = req.body.sessionToken
    // const session = await getSession({req})
    // console.log(session)
    console.log(req.body)
    // const user = req.session.user
    // console.log(req.session)

    const updatedUser = await prisma.user.update({
        where: {
            id: req.body.id
        },
        data: {
            username: data.username,
            contact: data.contact 
        }
    })

    if(updatedUser){
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully'
        })
    }else{
        res.status(400).json({
            success: false,
            error: "Failed to update profile!"
        })
    }
    // res.status(200).json({ success: true, message: 'Profile updated successfully'})
}
  