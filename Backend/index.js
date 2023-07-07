const express=require("express")
const { connection } = require("./config/db")
require("dotenv").config()
const cors =require("cors")
const { authentication } = require("./Middleware/userAuth")
const { userRouter } = require("./Routes/User.route")
const { oemsRoute } = require("./Routes/Oems.route")
const { oldInventryRoute } = require("./Routes/oldInventry.route")

const app=express()
app.use(express.json())
app.use(cors())


app.get("/", async(req,res)=>{

    try{
       res.send({Message:"This is home page"})
    }catch(err){
           console.log(err)
    }
})

app.use("/user" ,userRouter)
app.use("/oems" ,oemsRoute)
app.use(authentication)
app.use("/old" ,oldInventryRoute)



app.listen(process.env.PORT, async()=>{

    try{
         await connection
         console.log("connected succesfully")
    }catch(err){
           console.log(err)
    }

    console.log(`port is running on ${process.env.PORT}`)
})