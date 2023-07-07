const mongoose=require("mongoose")

const oldInventrySchema=mongoose.Schema({
    km:{type:Number,required:true},
    majorScratches:{type:String,required:true},
    originalPaint:{type:String,required:true},
    price:{type:Number,required:true},
    accidents:{type:String,required:true},
    prevBuyers:{type:String,required:true},
    userID:{type:String,required:true},
    image:{type:String,required:true},
    title:{type:String,required:true},
    desc:{type:String,required:true}




})


const InventryModel=mongoose.model("oldinventroy",oldInventrySchema)

module.exports={
    InventryModel
}