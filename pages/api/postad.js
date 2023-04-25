// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function handler (req, res) {

    // console.log(req.body.data)

    // const session = await getSession({req})

    const { ad_title, description, living_rooms, bed_rooms, bath_rooms, kitchens, country, state, city, pincode, addressL1, addressL2, latitude, longitude, price, contact } = req.body.data;
	console.log(pincode)
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
			pincode,
            addressL1,
            addressL2,
            latitude,
            longitude,
			price,
			contact,
			ownerId: req.body.id
		}
	})
	console.log(ad);
	res.status(200).json({
		success: true
	})
}
  