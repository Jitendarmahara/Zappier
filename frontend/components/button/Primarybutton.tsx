import { ReactNode } from "react";

export const PrimaryButton = ({children , onClick , size="small"}:{children:ReactNode , onClick : ()=>void , size ?:"small"| "big"})=>{
    return(
        <div onClick={onClick} className={`${size === "small" ? "text-sm " : " text-xl"} ${size==="small" ? " px-8  py-2 " : "px-12  py-2 "} bg-amber-700 cursor-pointer text-white  rounded-full hover:shadow-md text-center`}>
            {children}
        </div>
    )
}