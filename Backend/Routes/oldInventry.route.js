const express=require("express")
const {InventryModel} =require("../Model/oldInventry.model")
const { authentication } = require("../Middleware/userAuth")

const oldInventryRoute=express.Router()





// add data

oldInventryRoute.post("/addinventry" , authentication,async(req,res)=>{
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




/////// all data   /////////////////////

oldInventryRoute.get("/alldata", async (req, res) => {
    const { order, filter, search } = req.query;
  
    try {
      
  
      if (filter === "price") {
        let oldcars;

        const sortDirection = order === "desc" ? -1 : 1;
        oldcars = await InventryModel.find({})
          .populate("originalData")
          .sort({ price: sortDirection });

        res.status(200).send({ oldcars });

      } else if (filter === "milegeofmodel") {
        const sortDirection = order === "desc" ? -1 : 1;
         let  oldcars = await InventryModel.find({})
            .populate("originalData")
            .sort({ "originalData.milegeofmodel": sortDirection })
            .lean();
      
          
         
          res.status(200).send({ oldcars });
         
      }
       else if (filter === "colorofmodel") {
      const regexQuery = { colorofmodel: { $regex: order, $options: "i" } };
       let oldcars = await InventryModel.find({})
          .populate({
            path: "originalData",
            match: regexQuery,
          })
          .exec();
        oldcars = oldcars.filter((ele) => ele.originalData !== null);

        res.status(200).send({ oldcars });
      } else {
        let oldcars = await InventryModel.find({}).populate({
          path:"originalData"
        });
        res.status(200).send({ oldcars });
      }
  
     
    } catch (error) {
      res.status(500).send({ msg: error.message,mdggg:"hello" });
    }
  });



// get  by id 

// oldInventryRoute.get("/:id", async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       let oldcars = await InventryModel.findById(id);
//       res.status(200).send({ oldcars });
//     } catch (error) {
//       res.status(500).send({ msg: error.message });
//     }
//   });

  // GET all cars BY therir ID

oldInventryRoute.get("/:id",async(req,res)=>{
    const ID=req.params.id

    try{
        const oldcars =await  InventryModel.findOne({_id:ID}) 
        res.status(200).send({ oldcars });

    }catch(err){
        console.log(err)
        console.log({"error":"Error is coming While Get data"})

    }
})

//// PATCH REQUEST

oldInventryRoute.patch("/update/:id",authentication,async(req,res)=>{
    const ID=req.params.id
    const payload=req.body

    // For Finding Id Building RelationShip
    const car=await InventryModel.findOne({_id:ID})
    console.log(car,"car user id")
    const userID_in_car=car.userID
    const userID_making_req=req.body.userID

    try{
        if(userID_making_req !==userID_in_car){

            res.send({"Msg":"You are not authorized"})

        }else{
            await InventryModel.findByIdAndUpdate({_id:ID},payload)
            res.send(`update the car whose ID is ${ID}`)

        }


    }catch(err){

        console.log(err)
        console.log({"error":"Error is coming While Patch car"})


    }

})

// DELETE REQUEST

oldInventryRoute.delete("/delete/:id",authentication,async(req,res)=>{
    const ID=req.params.id
    //const payload=req.body

    // For Finding Id Building RelationShip
    const car=await InventryModel.findOne({_id:ID})
    console.log(car,"car user id")
    const userID_in_car=car.userID
    const userID_making_req=req.body.userID

    try{
        if(userID_making_req !==userID_in_car){

            res.send({"Msg":"You are not authorized"})

        }else{
            await InventryModel.findByIdAndDelete({_id:ID})
            res.send(`DELETE the car whose ID is ${ID}`)

        }


    }catch(err){

        console.log(err)
        console.log({"error":"Error is coming While DELETING car"})


    }

})


  


module.exports={
    oldInventryRoute
}