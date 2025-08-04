import express from "express"
import cors from "cors"
const app = express();
app.use(cors())
app.use(express.json());

import { zapRouter } from "./routes/zaproute";
import { userRouter } from "./routes/userroute";
import { actions } from "./routes/actions";
import { trigers } from "./routes/trigers";

app.use('/api/v1/user' , userRouter);
app.use('/api/v1/zap' , zapRouter);
app.use('/api/v1/actions' , actions );
app.use('/api/v1/trigers' , trigers)

app.listen(3001)