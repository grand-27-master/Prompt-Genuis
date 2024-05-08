import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import {connectDB} from "../../../utils/database";
import User from "@/models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    async session({session})
    {
        // return session;

        const sessionUser=await User.findOne({email: session.user.email});

        session.user.id=sessionUser._id.toString();
        return sessionUser;
    },

    async signIn({profile})
    {
    //     if (email === process.env.ADMIN_EMAIL)
    //     {
    //         if (password === process.env.ADMIN_PASSWORD)
    //         {
    //             return Promise.resolve({email: process.env.ADMIN_EMAIL});
    //         }
    //     }
    //     return Promise.resolve(null);

    try
    {
        // serverless 
        await connectDB();

        // check if user already exists
        const user = await User.findOne({email: profile.email});

        // if not create new user
        if (!user)
        {
            await User.create({
                username: profile.name,
                email: profile.email,
                image: profile.picture,
            });
        }
    }

    catch(error)
    {
        console.log(error);
    }
    }
    });

export {handler as GET, handler as POST};
