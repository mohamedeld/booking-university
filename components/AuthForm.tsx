'use client';

import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { isValid, z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "./ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
 

interface IProps<T extends FieldValues>{
  type:"SIGN_IN" | "SIGN_UP";
  schema:ZodType<T>;
  defaultValues:DefaultValues<T>;
  onSubmit:(data:T)=> Promise<{success:boolean,error?:string}>;
}

const AuthForm  = <T extends FieldValues>({type,schema,defaultValues,onSubmit}:IProps<T>) => {
  const {toast} = useToast();
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";
  const form:UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues:defaultValues as DefaultValues<T>,
  })
 
  // 2. Define a submit handler.
  const handleSubmit:SubmitHandler<T> =async (values)=> {
    const result = await onSubmit(values);
    if(result?.success){
      toast({
        title:"Success",
        description:isSignIn ? "login successfully" : "account created successfully"
      })
      router.push("/")
    }else{
      toast({
        variant:"destructive",
        description:result?.error || "Something went wrong"
      })
    }
  }

  const {isSubmitting,isValid} = form?.formState;

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? 'Welcome back to BookWise' : 'Create your library account'}
      </h1>
      <p className="text-light-100">
        {isSignIn ? 'Access the vast collection of resources, and stay updated' : 'Pleas complete all the fields and upload a valid university id to gain access to the library'}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
          {
            Object.keys(defaultValues)?.map((field)=>(
              <FormField
              key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{
                      FIELD_NAMES[field?.name as keyof typeof FIELD_NAMES]}</FormLabel>
                    <FormControl>
                      {field?.name === 'universityCard' ? (
                        <ImageUpload onFileChange={field?.onChange}/>
                      ):(
                        <Input required type={FIELD_TYPES[field?.name as keyof typeof FIELD_TYPES]} {...field} className="form-input" />

                      )}
                    </FormControl>
                
                    <FormMessage />
                  </FormItem>
                )}
              />

            ))
          }

          <Button type="submit" className="form-btn" disabled={isSubmitting || !isValid}>
            
            {isSubmitting ? 'Submitting' : isSignIn ? 'Sign in' : 'Sign up'}
          </Button>
        </form>

      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? 'New to BookWise' :'Already have an account'}
      <Link href={isSignIn ? '/sign-up':'/sign-in'} className="font-bold text-primary ml-2">
        {isSignIn ? 'Create an account' : 'Sign in'}
      </Link>
      </p>
    </div>
  )
}

export default AuthForm