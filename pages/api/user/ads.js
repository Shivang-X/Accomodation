// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getSession } from 'next-auth/react'


export default async function handler (req, res) {

    const session = await getSession({req})

    if(req.query.id !== 'undefined'){
        const ads = await prisma.HouseAd.findMany({
          where: {
            ownerId:session.user.id,
            id: parseInt(req.query.id)
          }
        })
        await new Promise(resolve => setTimeout(resolve, 500));
        res.status(200).json({
          success: true,
          ads
        })
      }else{
          const ads = await prisma.HouseAd.findMany({
          where: {
            ownerId:session.user.id
          }
        })
        await new Promise(resolve => setTimeout(resolve, 500));
        res.status(200).json({
          success: true,
          ads
        })
      }
}
  