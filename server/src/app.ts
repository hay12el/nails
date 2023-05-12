import express, {Request, Response} from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import 'dotenv/config';
import userRouter from './routers/userRouter'
import eventRouter from './routers/eventRouter'
import propertiesRouter from './routers/propertiesRouter'
import notificationRouter from './routers/NotificationRouter'

const app:express.Application = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json()) 
app.use(cors());

//Routing
app.use('/user', userRouter)
app.use('/event', eventRouter)
app.use('/properties', propertiesRouter)
app.use('/NotificationRouter', notificationRouter)

app.listen(process.env.PORT, () => {
    console.log("Node Is Listening.");
    mongoose.connect(process.env.ATLAS_URL || "")
    .then(() => {
        console.log("connect to Atlas.");  
    })
})