const mongoose=require("mongoose")
const { OemsModel } = require("./Oems.model")

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
    desc:{type:String,required:true},
    originalData:{ type: mongoose.Schema.Types.ObjectId, ref: OemsModel },




})


// {
//     "km": 430,
//     "majorScratches": "2",
    
//     "originalPaint": "Blue",
//     "price": 450000,
//     "accidents": 3,
//     "prevBuyers": 1,
//     "image": "https://e0.pxfuel.com/wallpapers/180/512/desktop-wallpaper-bugatti-chiron-pur-sport-front-view-2021-cars-hypercars-2021-bugatti-chiron-bugatti.jpg",
//     "title":"bugatti-chiron",
//     "desc":"This is best card in the word"

// }


const InventryModel=mongoose.model("oldinventroy",oldInventrySchema)

module.exports={
    InventryModel
}