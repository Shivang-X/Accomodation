import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials
                const user = await prisma.user.findUnique({
                    where: {
                      email,
                    }
                });
                if(!user) throw new Error('Invalid Email/Password');
                if (user.password !== password) throw new Error('Invalid Email/Password');

                return user

            }
        })
    ],
    secret: "THIS_IS_SECRET",
    callbacks: {
        jwt: ({ token, user }) => {
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session, token}){
            if(token){
                session.id = token.id
            }
            const user = await prisma.user.findUnique({
                where: {
                  email: token.email,
                }
            });
            session.user = user
            return session
        },
        secret: "test",
        // jwt: {
        //     secret: "test",
        //     encryption: true
        // }
    },
    pages: {
        // signIn: '/auth/register',
        signIn: '/auth/login'
    }
}
export default NextAuth(authOptions)