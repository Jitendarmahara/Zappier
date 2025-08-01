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
            value: x.zaprunid
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