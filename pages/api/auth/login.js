// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { email, password } = req.body;

    try{
        if (!email || !password)  throw new Error('Please enter email and password');

        const user = await prisma.user.findUnique({
        where: {
            email,
        }
        });

        if(!user) throw new Error('Invalid Email/Password');

        if (user.password !== password) throw new Error('Invalid Email/Password');

        req.session.user = user;
        console.log('Logged In')
        res.status(200).json({
        success: true,
        user,
        });
        

    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}
  