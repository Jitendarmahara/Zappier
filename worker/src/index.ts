// the work of the worker is to push the data form the ZapruOutbox to this topic and then the process will process it 
// depending up on the comment passed in....
import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";
const client = new PrismaClient();
const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
    clientId:'outbox-processor',
    brokers:['localhost:9092']
})
async function main() {
    const producer = kafka.producer();
    await producer.connect();
    while(1){
        const pendingrows =  await client.zapRunOutBox.findMany({
            where:{},
            take:10
        })
      await producer.send({
        topic:TOPIC_NAME,
        messages: pendingrows.map(x =>({
            value:JSON.stringify({
                zapRunId: x.zaprunid,
                step :0
            })
        }))
      })
      // as son as pushed delete then from the data

      await client.zapRunOutBox.deleteMany({
        where:{
            id: {
                in:pendingrows.map(x =>x.id)
            }
        }
      })
    }
}
main()