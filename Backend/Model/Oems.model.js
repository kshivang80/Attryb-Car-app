const mongoose=require("mongoose")

const oemsSchema=mongoose.Schema({
    nameofmodel:{type:String,required:true},
    yearofmodel:{type:String,required:true},
    newmodelprice:{type:String,required:true},
    colorofmodel:{type:Array,required:true},
    milegeofmodel:{type:Number,required:true},
    powerofmodel:{type:Number,required:true},
    maxspeedofmodel:{type:Number,required:true},
    imageofmodel:{type:String,required:true},

})


const OemsModel=mongoose.model("oemspecs",oemsSchema)

module.exports={
    OemsModel
}