// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getSession } from 'next-auth/react'
import { getProviders } from "next-auth/react"
import { getCsrfToken } from "next-auth/react"


export default async function handler (req, res) {

    // const session = await getSession({req})
    // const providers = await getProviders()
    // const csrfToken = await getCsrfToken({ req })
    // console.log("session", session)
    console.log(req.headers.abc, "Header")
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: req.headers.abc,
    //   }
    // });
    if(req.query.id !== 'undefined'){
        const ads = await prisma.HouseAd.findMany({
          where: {
            ownerId:req.headers.abc,
            id: parseInt(req.query.id)
          }
        })
        // await new Promise(resolve => setTimeout(resolve, 500));
        res.status(200).json({
          success: true,
          ads
        })
      }else{
          const ads = await prisma.HouseAd.findMany({
          where: {
            ownerId: parseInt(req.headers.abc)
          }
        })
        // await new Promise(resolve => setTimeout(resolve, 500));
        res.status(200).json({
          success: true,
          ads
        })
      }
}
  