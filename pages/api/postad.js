// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getSession } from 'next-auth/react'


export default async function handler (req, res) {

    // console.log("dsg")

    // const session = await getSession({req})

    const { ad_title, description, living_rooms, bed_rooms, bath_rooms, kitchens, country, state, city, addressL1, addressL2, latitude, longitude, price, contact } = req.body.data;
    const user = req.body.session.data.user

	// const user = session.data.user;
	const ad = await prisma.HouseAd.create({
		data: {
			ad_title,
			description,
			living_rooms,
			bed_rooms,
			bath_rooms,
			kitchens,
			country,
			state,
			city,
            addressL1,
            addressL2,
            latitude,
            longitude,
			price,
			contact,
			ownerId: user.id
		}
	})
	console.log(ad);
	res.status(200).json({
		success: true
	})
}
  