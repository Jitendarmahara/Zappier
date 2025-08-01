import express from "express"
import cors from "cors"
const app = express();
app.use(cors())
app.use(express.json());

import { zapRouter } from "./routes/zaproute";
import { userRouter } from "./routes/userroute";

app.use('/api/v1/user' , userRouter);
app.use('/api/v1/zap' , zapRouter)

app.listen(3000)