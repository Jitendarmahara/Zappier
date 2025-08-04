"use client"
import { BACKEND_URL } from "@/app/config/config";
import { Appbar } from "@/components/appbar";
import { LinkedButton } from "@/components/button/Linkedbutton";
import { Zapfill } from "@/components/zapfill";
import axios from "axios";
import { useEffect, useState } from "react"
function useActionsandTriger(){
    const[avaactions , setavaactions] = useState([]);
    const[avatrigers , setavatrigers] = useState([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/actions/avaliableactions`)
            .then(x=>{
                setavaactions(x.data.avaliableactions),
                console.log("i was claled")
            })
        axios.get(`${BACKEND_URL}/api/v1/trigers/avaliabletrigers`)
            .then(x=>{setavatrigers(x.data.avaliabletrigers), console.log('hieiei')})
    },[])

    console.log(avaactions)
    console.log(avatrigers)
    return{avaactions , avatrigers}
}
export default function(){
    const{avaactions ,avatrigers} = useActionsandTriger();
    const [triger ,settriger] = useState<{
        id:string,
        name:string
        image:string
    }>();
    const [actions , setactions] = useState<{
        index : number
        avaliableactionid:string,
        avaliableactioname: string,
        image:string
    }[]>([]);
    const[selectedmodalindex , setselectedmodalindex] = useState<null | number>(null) // this will keep trak in which modal index we are currently
    console.log(triger)
    return(
        <div>
            <Appbar></Appbar>
            <div className="flex flex-col justify-center min-h-screen">
                <div className="flex justify-center">
                  <Zapfill onClick={()=>{
                    setselectedmodalindex(1);
                  }}name={triger?.name ? triger.name : "Triger"} index={1} image={triger?.image}></Zapfill>
                </div>
                 <div className=" pt-2 ">
                  {actions.map((xa)=> <div className="flex justify-center pt-2"><Zapfill onClick={()=>{
                    setselectedmodalindex(xa.index)
                  }} name={xa.avaliableactioname? xa.avaliableactioname:"actions"} index={xa.index} image={xa.image}></Zapfill> </div>)}
                </div>
                <div className="flex justify-center w-full">
                    <div>
                        <LinkedButton onClick={()=>{
                            setactions(x => [...x , {
                                index: x.length +2,
                                avaliableactioname:"",
                                avaliableactionid:"",
                                image:""
                            }])
                        }}>
                            <div className="text-2xl">
                                +
                            </div>
                        </LinkedButton>
                    </div>
                </div>
            </div>
           <div>{selectedmodalindex}</div>
            {selectedmodalindex && <Modal avaliableitem={selectedmodalindex===1 ? avatrigers  : avaactions} onSelect={(prop:null | {name:string , id:string , image:string})=>{
                if(prop===null){
                    setselectedmodalindex(null);
                    return;
                }
                if(selectedmodalindex === 1){
                    settriger({
                        id: prop.id,
                        name : prop.name,
                        image: prop.image
                    })
                }else{
                    setactions(x =>{
                        let newactinon = [...x];
                        newactinon[selectedmodalindex-2] = {
                            index : selectedmodalindex,
                            avaliableactioname:prop.name,
                            avaliableactionid:prop.id,
                            image: prop.image
                        }
                        return newactinon
                    })
                }
            }}  index={selectedmodalindex}></Modal>}
        </div>
    )
}
function Modal({index , onSelect , avaliableitem}:{ index:number  , onSelect:(prop:null |{name:string , id:string , image:string})=>void,avaliableitem:{id:string , name:string , image:string;}[]}){
    
    return (
      <div onClick={()=>{
        onSelect(null)
      }} className=" overflow-y-auto flex overflow-x-hidden bg-slate-100 bg-opacity-70 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div  className="relative p-4 w-full max-w-2xl max-h-full  ">
    
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-white">
            
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-black">
                    Select {index===1?"triger":"actions"}
                </h3>
                <button onClick={()=>{
                    onSelect(null)
                }}  type="button" className=" cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
           
            <div className="p-4 md:p-5 space-y-4">
                {avaliableitem.map(({id , name , image})=>
                <div onClick={()=>{
                    onSelect({
                        id,
                        name,
                        image
                    })
                }} className="flex border p-4 cursor-pointer  hover:bg-blue-400">
                    <img src={image} width={30} className="bg-black"/> <div>{name}</div>
                </div>
                )}
            </div>
          
           
        </div>
    </div>
</div>
    )
}

