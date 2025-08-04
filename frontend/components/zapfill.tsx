'use client'
export const Zapfill = ({name, index , onClick , image}:{name:string , index:number , onClick:()=>void , image ?:string | undefined})=>{
    return(
        <div onClick={onClick} className="border cursor-pointer border-black px-4 py-4 flex justify-center w-[300px]">
            <div className="font-bold">
                {index}
            </div>
            <div>
                {name}
            </div>
            { image && image.trim()!== "" && (<div className="pl-2"><img src={image} width={30} height={40}></img></div>) }
        </div>
    )
}