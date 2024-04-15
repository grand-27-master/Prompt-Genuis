import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    async session({session})
    {
        return session;
    },

    async signIn({email, password})
    {
        if (email === process.env.ADMIN_EMAIL)
        {
            if (password === process.env.ADMIN_PASSWORD)
            {
                return Promise.resolve({email: process.env.ADMIN_EMAIL});
            }
        }
        return Promise.resolve(null);
    }
    });

export default handler;
