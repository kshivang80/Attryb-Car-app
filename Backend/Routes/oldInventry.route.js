const express=require("express")
const {InventryModel} =require("../Model/oldInventry.model")

const oldInventryRoute=express.Router()


oldInventryRoute.get("/alldata",async(req,res)=>{
    let queryData=req.query

    try{
        const cars =await  InventryModel.find(queryData) 
        res.send(cars)

    }catch(err){
        console.log(err)
        console.log({"error":"Error is coming While Get data"})

    }
})


// add data

oldInventryRoute.post("/addinventry" , async(req,res)=>{
     let data=req.body

     try{
        let new_data= new InventryModel(data)
         await new_data.save()

         console.log(new_data)
         res.send({Message:"New Data is added succesfully"})

     }catch(err){
           console.log(err)
          res.send({Message:"Error while adding data"})
     }


})


module.exports={
    oldInventryRoute
}