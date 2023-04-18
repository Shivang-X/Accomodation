// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function handler(req, res) {
    try{
        // const session = await getSession(context);
        // console.log(session)
        const { username, contact, email, password } = req.body;
        if (!username || !contact || !email || !password) throw new Error('Please fill all the fields');
    
        const doesExist = await prisma.user.findUnique({ 
          where: {
            email
          }
        })
    
        if(doesExist) throw new Error('Email already registered !');
    
        const user = await prisma.user.create({
          data: {
            username,
            email,
            contact,
            password,
          },
        });
        
        // req.session.user = user
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
  