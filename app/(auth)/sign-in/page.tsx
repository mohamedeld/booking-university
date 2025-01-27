'use client';

import AuthForm from "@/components/AuthForm"
import { signInSchmea } from "@/lib/validation"

const SignInPage = () => {
  return (
    <>
      <AuthForm
        type="SIGN_IN"
        schema = {signInSchmea}
        defaultValues = {{email:'',password:''}}
        onSubmit = {()=>{}} 
      />
    </>
  )
}

export default SignInPage