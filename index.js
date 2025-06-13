//require('dotenv').config({path:'.env'})


import mongoose, { connect } from "mongoose" 
import { DB_NAME } from "./constants.js"  
import connectDB from "./db/index.js"
import  dotenv  from "dotenv"
import { app } from "./app.js"


dotenv.config({path:'.env'})
connectDB()
.then(()=>{
app.listen(process.env.PORT ||8000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
})
.catch((err)=>{
    console.error("Error connecting to the database", err)
    process.exit(1) // Exit the process with failure
})


























/*
import express from "express"

const app = express()

(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, )
        app.on("error",(error)=>{
            console.log("Error connecting to the database", error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    }catch(error){
        console.error("ERROR",error)
        throw
    }
})()
    */