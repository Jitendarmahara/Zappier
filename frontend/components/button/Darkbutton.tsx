'use client'
import { ReactNode } from "react";

export const Darkbutton = ({children , onClick}:{children:ReactNode , onClick:()=>void})=>{
    return(
        <div onClick={onClick} className=" flex flex-col justify-center text-center hover:shadow-md bg-purple-700 text-white rounded-full cursor-pointer  px-8 py-2">
            {children}
        </div>
    )
}