'use client';
import React, { useState, useTransition } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast';
import { borrowBook } from '@/lib/actions/book';
import { useRouter } from 'next/navigation';


interface IProps{
  bookId:string;
  userId:string;
  borrowingEligbility : {
    isEligible:boolean;
    message:string;
  }
}

const BorrowButton = ({bookId,userId,borrowingEligbility:{isEligible,message}}:IProps) => {
  const [isPending,startTransition] = useTransition();
  const { toast } = useToast()
  const router = useRouter();

  async function handleClick(){
    if(!isEligible){
      toast({
        variant:"destructive",
        description:message
      })
      return;
    }
    try{
      startTransition(async()=>{
        const res = await borrowBook({bookId,userId});
      if(!res?.success){
        toast({
          variant:"destructive",
          description:res?.message || "Error on borrowing book"
        })
return;
      }
      toast({
        title:"Success",
        description:res?.message || "Book borrowed successfully"
      })
      router.push("/profile")
      })
    }catch(error){
      toast({
        variant:"destructive",
        description:error instanceof Error  ? error?.message : "Something went wrong"
      })
    }
  }
  return (
    <Button disabled={isPending} onClick={handleClick} className="book-overview_btn">
        <Image src="/icons/book.svg" alt="book icon" width={20} height={20} className="object-cover"/>
          <p className="font-bebas-neue text-xl text-dark-100">
            {isPending ? 'Borrowing...':'Borrow Book'}
          </p>
        </Button>
  )
}

export default BorrowButton