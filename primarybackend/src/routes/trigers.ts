import { Router } from "express";
import { authmiddelware } from "../authmiddleware";
import { client } from "../db";
const router  = Router();

router.get('/avaliabletrigers' , async (req , res)=>{
    const avaliabletrigers = await client.avaliableTriger.findMany({
        where:{}
    })
    res.status(200).json({avaliabletrigers})
})

export const trigers = router;