"use client"
import { LinkedButton } from "./button/Linkedbutton"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./button/Primarybutton";
export const Appbar = ()=>{
    const router = useRouter();
    return<div className="flex justify-between border-b p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            Zapier
        </div>
        <div className="flex">
            <div className="pr-4 ">
                
                <LinkedButton onClick={()=>{}}>
                <div className="flex ">
                <div className=" pr-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-name="navApps" data-block="false" data-pointer-events="true" data-animate-fill="true"><path d="M3 11H11V3H3V11ZM5 5H9V9H5V5Z" fill="currentColor"></path><path d="M3 21H11V13H3V21ZM5 15H9V19H5V15Z" fill="currentColor"></path><path d="M13 21H21V13H13V21ZM15 15H19V19H15V15Z" fill="currentColor"></path><path d="M18 6V3H16V6H13V8H16V11H18V8H21V6H18Z" fill="currentColor"></path></svg></div>
                Explort Apps
                </div>  
                </LinkedButton>
            </div>
            <div className="pr-4">
                <LinkedButton onClick={()=>{}}>Contact Sales</LinkedButton>
            </div>
            <div className="pr-4">
                <LinkedButton onClick={()=>{
                    router.push("/login")
                }}>LogIn</LinkedButton>
            </div>
                <PrimaryButton onClick={()=>{
                    router.push("/signup")
                }}>
                signup
                </PrimaryButton>
        </div>

    </div>
}