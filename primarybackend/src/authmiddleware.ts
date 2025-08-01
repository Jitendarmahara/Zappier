import { NextFunction , Request , Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
export function authmiddelware(req:Request , res:Response , next:NextFunction){
    const token = req.headers.authorization as string
    try{
        const payload = jwt.verify(token , JWT_SECRET)
        //@ts-ignore
        req.id = payload.id
        next()
    }catch(e){
        res.status(403).send("u are not loged in")
    }
   
}