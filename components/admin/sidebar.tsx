'use client';

import { adminSideBarLinks } from "@/constants"
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Session } from "next-auth";




const Sidebar = ({session}:{session:Session}) => {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image src={"/icons/admin/logo.svg"} alt="admin logo dashboard" height={37} width={37} className="object-cover"/>
          <h1>BookWise</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {
            adminSideBarLinks?.map((item)=>{
              const isSelected= (item?.route !== "/admin" && pathname?.includes(item?.route) && item?.route?.length > 1 ) || pathname === item?.route;
              return (
                <Link href={item?.route} key={item?.route}>
                  <div className={cn(
                    "link",
                    isSelected && 'bg-primary-admin shadow-sm'
                  )}>
                    <div className="relative size-5">
                      <Image src={item?.img} alt={item?.text} fill className={`${isSelected ? 'brightness-0 invert' : ''} object-contain`}/>
                    </div>
                    <p className={cn(
                      isSelected ? "text-white" : "text-dark-500"
                    )}>{item?.text}</p>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
      <div className="user">
      <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col max-md:hidden">
              <p className="font-semibold text-dark-200">{session?.user?.name}</p>
              <p className="text-light-500 text-xs">{session?.user?.email}</p>
            </div>
      </div>
    </div>
  )
}

export default Sidebar