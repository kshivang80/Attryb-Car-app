const express=require("express")
const { connection } = require("./config/db")
require("dotenv").config()
const cors =require("cors")

const app=express()
app.use(express.json())
app.use(cors())


app.get("/", async(req,res)=>{

    try{
       res.send({"msg":"This is home page"})
    }catch(err){
           console.log(err)
    }
})



app.listen(process.env.PORT, async()=>{

    try{
         await connection
         console.log("connected succesfully")
    }catch(err){
           console.log(err)
    }

    console.log(`port is running on ${process.env.PORT}`)
})