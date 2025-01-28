'use client';

import AuthForm from "@/components/AuthForm"
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchmea } from "@/lib/validation"

const SignInPage = () => {
  return (
    <>
      <AuthForm
        type="SIGN_IN"
        schema = {signInSchmea}
        defaultValues = {{email:'',password:''}}
        onSubmit = {signInWithCredentials} 
      />
    </>
  )
}

export default SignInPage