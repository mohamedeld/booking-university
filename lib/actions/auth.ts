'use server';

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { AuthCredentiasl } from "@/utils/types";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export async function signInWithCredentials(params:Pick<AuthCredentiasl,"email" | "password">){
  try{
    const {email,password} = params;
    const result = await signIn('credentials',{
      email,password,redirect:false
    })
    if(result?.error){
      return {
        success:false,
        error:"Invalid credentials"
      }
    }
    return {
      success:true
    }
  }catch(error){
    console.log("error login ", error);
    return {
      success:false,
      error:"login error"
    }
  }
}


export async function signUp(params:AuthCredentiasl){
  try{
    const {fullName,email,universityId,universityCard,password } = params;

    const existingUser = await db.select().from(users).where(eq(users?.email,email)).limit(1);

    if(existingUser?.length > 0){
      return {
        success:false,
        error:"User already exist"
      }
    }
    const hashedPassword = await hash(password,10);
    
    await db.insert(users).values({  
      fullName,
      email,
      password:hashedPassword,
      universityCard,
      universityId
    })
    await signInWithCredentials({email,password})
    return {
      success:true
    }
  }catch(error){
    console.log("error signup ", error);
    return {
      success:false,
      error:"Signup error"
    }
  }
}