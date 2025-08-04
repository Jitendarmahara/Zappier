'use client'
import { ReactNode } from "react";
export const LinkedButton = ({children , onClick}:{children:ReactNode , onClick:()=> void})=>{
    return(
        <div className="px-2 py-1 cursor-pointer hover:bg-slate-100 font-light text-sm text-center" onClick={onClick}>
            {children}
        </div>
    )
}