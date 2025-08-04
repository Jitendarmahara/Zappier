import { Router } from "express";
import { authmiddelware } from "../authmiddleware";
import { client } from "../db";
const router  = Router()

router.get('/avaliableactions' , async (req , res)=>{
    const avaliableactions = await client.avaliableActions.findMany({
        where:{}
    });
    res.status(200).json({
        avaliableactions
    })
})

export const actions = router;