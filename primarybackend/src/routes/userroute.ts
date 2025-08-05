import {Router} from "express";
import { Signinschema, Signupschema } from "../types/type";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { JWT_SECRET } from "../config";
import { authmiddelware } from "../authmiddleware";

const router = Router();
const client = new PrismaClient();
router.post("/signup", async (req , res)=>{
    const body = req.body;
    const parseddata = Signupschema.safeParse(body)
    if(!parseddata.success){
        res.status(403).send("wrong input")
    }
      const hashpassword = await bcrypt.hash(body.password , 10) 
    await client.user.create({
        data:{
            name: parseddata.data?.name as "",
            email:parseddata.data?.email as "",
            password: hashpassword
        }
    })
    res.send("the user hass beeb added sucessfully")
})

router.post("/signin" , async(req , res)=>{
    const body = req.body;
    const parseddata = Signinschema.safeParse(body);
    if(!parseddata.success){
        res.status(403).send("wrong inputs")
        return
    }
     const user = await client.user.findFirst({
        where:{
            email: parseddata.data.email,
        }
    })
    if(!user){
       return  res.send("no user found with this email ")
        
    }
    const pass = user.password
    console.log(pass)
    console.log(parseddata.data.password);
    const validpass = await bcrypt.compare(parseddata.data.password , pass)
    console.log(validpass)
    if(!validpass){
       return res.status(403).send("worng email or password")
    }
    const token = jwt.sign({
        id: user.id 
    },JWT_SECRET)
   return  res.json({
        token: token
    })
})
router.get('/', authmiddelware  , async(req , res)=>{
    //@ts-ignore
    const id = req.id
    const user = await client.user.findFirst({
        where:{
            id: id
        },
        select:{
            email:true,
            name:true
        }
    })
     res.json({
        user
    })
})

export const userRouter = router
