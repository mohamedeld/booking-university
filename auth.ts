import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "./database/drizzle";
import { users } from "./database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if(!credentials?.email || !credentials?.password){
          return null;
        }
        const user = await db.select().from(users).where(eq(users?.email,credentials?.email?.toString())).limit(1);
        if(user?.length === 0){
          return null;
        }else{
          const isValidPassword = await compare(credentials?.password?.toString(), user[0]?.password);
          if(!isValidPassword){
            return null;
          }
          return {
            id:user[0]?.id?.toString(),
            email:user[0]?.email,
            name:user[0]?.fullName
          } as User
        }
      },
    }),
  ],  
  session:{
    strategy:'jwt'
  },
  pages:{
    signIn:'/sign-in'
  },
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.id = user?.id;
        token.name = user?.name;
      }
      return token;
    },
    async session({session,token}){
      if(token){
        session.user.id = token?.id as string;
        session.user.name = token?.name as string;
      }
      return session
    }
  }
})