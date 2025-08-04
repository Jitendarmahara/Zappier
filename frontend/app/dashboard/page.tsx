"use client"
import { Appbar } from "@/components/appbar";
import { Darkbutton } from "@/components/button/Darkbutton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config/config";
import { LinkedButton } from "@/components/button/Linkedbutton";
import { useRouter } from "next/navigation";
export default function (){
    const {loading , zap} = useZaps();
    const router = useRouter();
    return(
        <div>
            <Appbar></Appbar>
            <div className="flex justify-center pt-8">
                <div className="max-w-screen-lg w-full">
                    <div className="flex justify-between pr-8">
                        <div className="text-2xl font-bold">
                            My Zaps
                        </div>
                        <Darkbutton onClick={()=>{
                            router.push('/zap/create')
                        }}>Create</Darkbutton>
                    </div>
                </div>
            </div>
            {loading ?"loading....": <div className="flex justify-center"><Zaptbale zap={zap}></Zaptbale> </div>}
        </div>
    )
}
interface zap{
    id:string,
    trigerId:string,
    userId:string,
    actions:{
        id:string,
        actionId:string
        zapId:string
        sortingorder:  number
        type:{
            id:string
            name:string
        }
    }[],
    triger:{
        id:string,
        zapId:string,
        trigerId:string,
        type:{
            id:string,
            name:string
        }
    }

}
function useZaps(){
    const[loading , setloading] = useState(true);
    const[zap , setzap] = useState<zap[]>([]); // what will the type of zap useState(Zap[])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/zap`,{
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(res =>{
                setzap(res.data.zap)
                setloading(false)
            })
    }, [])

    return {loading , zap}
}

function Zaptbale({zap}:{zap:zap[]}){
    const router = useRouter();
    return(
        <div className="pt-8 max-w-screen-lg w-full  mx-auto px-4">
            <div className="flex">
                <div className="flex-1">Name</div>
                <div className="flex-1">LastEdit</div>
                <div className="flex-1">Running</div>
                <div className="flex-1">Go</div>
            </div>
            {zap.map(x => <div className="flex border-b border-t p-4"> 
                <div className="flex-1">{x.triger.type.name} {x.actions.map(x=>x.type.name)+" "} </div>
                <div className="flex-1">{x.id}</div>
                <div className="flex-1">03-08-2025</div>
                <div className="flex-1"><LinkedButton onClick={()=>{
                    router.push('/zap/'+x.id)
                }}>Go</LinkedButton></div>
            </div>)}
        </div>
    )
}