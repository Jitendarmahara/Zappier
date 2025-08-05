import express from "express";
const app  =  express();
app.use(express.json());
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

app.post("/hooks/catch/:userId/:zapId", async(req , res)=>{
    const userId = req.params.userId;
    const zapId  = req.params.zapId;
    const data = req.body
    await client.$transaction(async tnx =>{
        const run = await tnx.zapRun.create({
            data:{
                zapid : zapId,
                metadat:data
            }
        })

        await tnx.zapRunOutBox.create({
            data:{
                zaprunid:run.id
            }
        })
    })
    // form here we push the messages to the kafka queuq 
    console.log("hi the transacrtion was succesfull")
    res.status(200).send("this was done nice")

})

app.listen(3002 , ()=>{
    console.log("server is listning on port 3000")
})