"use client"
import { Appbar } from "@/components/appbar";
import { PrimaryButton } from "@/components/button/Primarybutton";
import { Checkfeature } from "@/components/checkfeatures";
import { Input } from "@/components/input";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config/config";
import { useRouter } from "next/navigation";

export default function (){
    const[email , setemail] = useState("");
    const[password , setpassword] = useState("");
    const router = useRouter();
return(
        <div>
            <Appbar></Appbar>
            <div className="flex justify-center ">
                <div className="flex max-w-2xl">
                    <div className="flex-1 pt-20">
                        <div className="font-semibold text-3xl pl-4  ">
                            Join millions worldwide who automate their work  using zapier
                        </div>
                        <div className="pt-4">
                            <Checkfeature lable = {"Easy setup, no coding required"}></Checkfeature>
                        </div>
                        <div className="pt-2">
                            <Checkfeature lable="Free forever for core features"></Checkfeature>
                        </div>
                        <div className="pt-2" >
                            <Checkfeature lable="14-day trial of premium features & apps"></Checkfeature>
                        </div>
                        
                    </div>

                    <div className="flex-1 pt-6 pb-6 mt-12 px-4 rounded  border">
                        <Input lable="Email" placeholder="Enter your Email" type="text" onChange={(e)=>{
                            setemail(e.target.value)
                        }}></Input>
                        <Input lable="Passwored" placeholder="Enter your Password" type="password" onChange={(e)=>{
                            setpassword(e.target.value)
                        }}></Input>

                        <div className="pt-4">
                            <PrimaryButton size="big" onClick={async()=>{
                                try{
                                const res =  await axios.post(`${BACKEND_URL}/api/v1/user/signin` , {
                                    email,
                                    password

                                })
                                localStorage.setItem("token" , res.data.token)
                                router.push('/dashboard')

                            }catch(e){
                                console.log(e);
                            }

                            }}>Get Started free</PrimaryButton>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}