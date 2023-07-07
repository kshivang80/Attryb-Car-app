const express=require("express")
const {OemsModel} =require("../Model/Oems.model")

const oemsRoute=express.Router()




oemsRoute.post('/create', async(req,res)=>{
       let data=req.body
    try{
        const new_data=new OemsModel(data);
         await new_data.save()
         console.log(new_data)
         res.send({Meaasge:"added the new car Data Successfully"})

    }catch(err){
        console.log(err)
        console.log({"error":"Error is coming While Creating New Data"})

    }
})



oemsRoute.get("/allOems" ,async(req,res)=>{

    //The $regex operator is used for pattern matching
   // the $options: "i" option makes the search case-insensitive, 
    const {searchQuery} =req.query;


    try{
        if(searchQuery){

            let carSpecs= await OemsModel.find({
                $or:[
                    {nameofmodel:{$regex :searchQuery ,$options:"i"}},
                    {yearofmodel:{$regex :searchQuery ,$options:"i"}},
                    {colorofmodel:{$regex :searchQuery ,$options:"i"}},
                    {newmodelprice:{$regex :searchQuery,$options:"i"}}
                ]
            })

            res.status(200).send({carSpecs})

        }else{
            let carSpecs= await OemsModel.find(searchQuery);
             res.send(carSpecs)

        }

    }catch(err){
        console.log({"Error":"Error While searchQuery"})
        console.log(err)
    }
})



module.exports={
    oemsRoute
}

