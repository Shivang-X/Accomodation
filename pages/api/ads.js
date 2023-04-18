// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useSession, getSession } from 'next-auth/react'


export default async function handler (req, res) {

    // console.log("dsg")

    const session = await getSession({req})
	console.log(session)

    const { country, state, city, id } = req.query;
	if(country !== 'undefined' && country !== undefined){  
        const ads = await prisma.HouseAd.findMany({
			where: {
				country,
				state,
				city
	        }
		})
        await new Promise(resolve => setTimeout(resolve, 500));
		res.status(200).json({
			success: true,
			ads
		})
	}else if(id){
        const ads = await prisma.HouseAd.findMany({
            where:{
                id: parseInt(id)
            }
        })
    await new Promise(resolve => setTimeout(resolve, 500));
		res.status(200).json({
			success: true,
			ads
		})
    }else{
		const ads = await prisma.HouseAd.findMany()
        await new Promise(resolve => setTimeout(resolve, 500));
		res.status(200).json({
			success: true,
			ads
		})
	}
}
  