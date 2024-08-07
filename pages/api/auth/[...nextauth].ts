import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

const options: NextAuthOptions = {
    theme: {
        colorScheme: 'dark',
    },
    debug: true,
    session: {},
    jwt: {},
    providers: [
        Credentials({
            name: 'Platzi',
            credentials: {
                // email: {type: 'email', label: 'Email'},
                password: {type: 'password', label: 'Password'}
            },
            async authorize(credentials){
                //Conectar API
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json'}
                })

                //JSON rta
                const user = await res.json()

                //Return user or null
                if(res.ok && user){
                    return user
                }
                return null
            }
            
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? ''
        })
    ]
};

export default NextAuth(options);