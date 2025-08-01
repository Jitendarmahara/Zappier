import {Router} from "express"
import { authmiddelware } from "../authmiddleware";
import { Zapschema } from "../types/type";
import { client } from "../db";
const router =  Router();
router.post("/" , authmiddelware ,  async(req , res)=>{
    //@ts-ignore
    const id = req.id
    const body =  req.body
    const parsedata = Zapschema.safeParse(body);
    if(!parsedata.success){
        return res.json({
            msg:"wrong inputs"
        })
    }
    try{
    await  client.$transaction(async tx=>{
        const zap = await  tx.zap.create({
            data:{
                userId: id,
                trigerId : "",
                actions:{
                    create: parsedata.data.actions.map((x , index) => ({
                        actionid: x.actionId,
                        sortingorder: index
                    }))
                }

            }
        })
        const triger  = await  tx.triger.create({
            data:{
                zapId : zap .id,
                trigerId : parsedata.data.trigerId
            } 
        })
        await tx.zap.update({
            where:{
                id : zap.id
            },
            data:{
                trigerId :  triger.id
            }
        })
    })
}catch(e){
    return res.status(505).json({
        msg:"internal sever error"
    })
}
return res.status(200).send("this is the webhook url that u need to hit")
    
})

router.get("/:zapId" , authmiddelware , async (req , res)=>{
    //@ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;
    const zaps = await client.zap.findFirst({
        where:{
            id : zapId,
            userId :  id
        },
        include:{
            actions:{
                include:{
                    type:true
                }
            },
            triger:{
                include:{
                    type:true
                }
            }
        }
    })
    return res.json({
        zaps
    })
    
})

router.get('/' , authmiddelware , async(req , res)=>{
    //@ts-ignore
    const id = req.id ;
    const zap = await client.zap.findMany({
        where:{
            userId: id
        },
        include:{
            actions:{
                include:{
                    type:true
                }
            },
            triger:{
                include:{
                    type:true
                }
            }
        }
    })
    return res.json({
        zap
    })
})

 export const zapRouter = router

