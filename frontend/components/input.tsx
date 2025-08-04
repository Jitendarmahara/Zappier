"use client"
export const Input = ({lable , placeholder , onChange , type="text"}:{lable:string , placeholder:string , onChange:(e:any)=>void , type?:"text" | "password"})=>{
    return(
        <div >
            <div className="text-sm pb-2 pt-2">
               * {lable}
            </div>
            <input className="border rounded-full px-18 py-2" type={type} placeholder={placeholder} onChange={onChange}></input>
        </div>
    )
}