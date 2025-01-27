'use client';

import AuthForm from "@/components/AuthForm"
import { signUpSchmea } from "@/lib/validation"

const SignUpPage = () => {
  return (
    <>
      <AuthForm
         type="SIGN_UP"
                schema = {signUpSchmea}
                defaultValues = {
                  {
                    fullName:'',
                    email:'',
                    universityId:0,
                    password:'',
                    universityCard:''
                  }
                }
                onSubmit = {()=>{}}
      />
    </>
  )
}

export default SignUpPage