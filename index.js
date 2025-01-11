import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/userRoutes.js";
import mongoose from "mongoose";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import vehicleRouter from "./routes/vehicleRoute.js";
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors());

app.use(bodyParser.json())

const connectonString = process.env.MONGO_URL;
//console.log(connectonString)

mongoose.connect(connectonString).then(()=>{
    console.log("connected to the database")
}).catch(()=>{
    console.log("Failed to connect with the database")
})

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if(token != null){
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (decoded != null) {
                req.user = decoded
                next()
            }else{
                next()
            }
    

        });
    }else{
        next()
    }


});


app.use('/api/users', userRouter)
app.use('/api/vehicles', vehicleRouter)


app.listen(5000, (req,res)=>{
    console.log("server is running on port 5000")
})