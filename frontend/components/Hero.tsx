"use client"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./button/Primarybutton"
import { Secondarybutton } from "./button/Secondarybutton"
import { Feature } from "./Features/feature"
export const Hero = ()=>{
    const router = useRouter()
    return(
        <div>
        <div className="flex justify-center">
            <div className="text-5xl font-bold pt-8 max-w-xl text-center">
                Automate as fast as you can type
            </div>
        </div>
        <div className="flex justify-center">
            <div className="text-2xl , font-sans text-center pt-4 max-w-4xl"> 
                AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas
                into workflows and bots that work for you.
            </div>
        </div>
        
            <div className="flex justify-center pt-6">
                <PrimaryButton onClick={()=>{
                    router.push('/signup')
                }} size="big">Get Started free</PrimaryButton>
                <div className="pl-6">
                    <Secondarybutton size= "big" onClick={()=>{}}>Contact  Sales</Secondarybutton>
                </div>
            </div>
            <div className="flex justify-center pt-4">
                <Feature title="free forever" subtitle="for core features"></Feature>
                <Feature title="more apps" subtitle="then any other platforms"></Feature>
                <Feature title="cutting edge" subtitle="AI Features"></Feature>
            </div>
        
        </div>
    )
}