import { ReactNode } from "react";
export const Secondarybutton = ({children , onClick , size="small"}:{children:ReactNode , onClick : ()=>void , size ?:"small"| "big"})=>{
    return(
        <div onClick={onClick} className={`${size === "small" ? "text-sm " : " text-xl"} ${size==="small" ? " px-8  pt-1 " : "px-12  py-2"}  cursor-pointer text-black  border rounded-full hover:shadow-md`}>
            {children}
        </div>
    )
}