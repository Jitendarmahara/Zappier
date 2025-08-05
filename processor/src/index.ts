import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";
const TOPIC_NAME = "zap-events"
const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers:["localhost:9092"]
})
async function main(){
    const client = new  PrismaClient();
    const consumer = kafka.consumer({groupId:"main-worker"});
    await consumer.connect()
    const producer = kafka.producer();
    await producer.connect();
    await consumer.subscribe({topic:TOPIC_NAME , fromBeginning:true})

    await consumer.run({
        autoCommit:false,
        eachMessage : async ({topic, partition , message}) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString()
            })

            const parsedvalue = JSON.parse(message.value.toString())
            const parsedid = parsedvalue.zapRunId;
            const step = parsedvalue.step;

            // for this zaprunid we need to find the assoca

            const zapdetails = await client.zapRun.findFirst({
                where:{
                    id:parsedid
                },include:{
                    zap:{
                        include:{
                            actions:{
                                include:{
                                    type:true
                                }
                            }
                        }
                    }
                }
            })
            const currentstage = zapdetails?.zap.actions.find(x => x.sortingorder=== step);

            if(!currentstage){
                console.log("current stae does not found")
                return
            }

            if(currentstage.type.id === "email"){
                console.log("email send")
            }
            if(currentstage.type.id === "solana"){
                console.log("solana send")
            }
            await new Promise(r => setTimeout(r, 5000));
            
            const laststage = (zapdetails?.zap.actions.length || 1) -1

            if(laststage!=step){
                producer.send({
                    topic:TOPIC_NAME,
                    messages:[{
                        value:JSON.stringify({
                            step: step+1,
                            zapRunId:parsedid
                        })
                    }]
                })
            }

            console.log("processing done")
            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition:partition,
                offset: (Number(message.offset)+1).toString()
            }])
        },

        

    })
}
main()