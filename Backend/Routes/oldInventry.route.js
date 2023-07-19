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
         res.status(200).send({Message:"New Data is added succesfully"})

     }catch(err){
           console.log(err)
           res.status(400).send({Message:"Error while adding data"})
     }


})




/////// all data   /////////////////////

oldInventryRoute.get("/alldata", async (req, res) => {
  //const { order, filter, search, page=1, perPage=10 } = req.query;
    const { order, filter, search } = req.query;

  //The code uses populate() to fetch referenced data from another collection using the "originalData" field.
    try {
      
  
      if (filter === "price") {
        let oldcars;

        const sortDirection = order === "desc" ? -1 : 1;
        oldcars = await InventryModel.find({})
          .populate("originalData")
          .sort({ price: sortDirection });
          // .skip((parseInt(page) - 1) * parseInt(perPage))
         //.limit(parseInt(perPage));

        res.status(200).send({ oldcars });

      } else if (filter === "milegeofmodel") {

        const oldcars = await InventryModel.find({}).populate("originalData").lean();

        //     .lean()  // It returning plain JavaScript objects instead of full-fledged Mongoose documents.
       
       if(order==="asc"){
          oldcars.sort((a, b) => a.originalData.milegeofmodel - b.originalData.milegeofmodel);
        }else{
          oldcars.sort((a, b) => b.originalData.milegeofmodel - a.originalData.milegeofmodel);

        }

          res.status(200).send({ oldcars });
         
      }
       else if (filter === "colorofmodel") {
        //The $regex operator is used for pattern matching and text manipulation like (/\ferari\w*/gi)
      // the $options: "i" option makes the search case-insensitive, 
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
      res.status(500).send({ msg: error.message });
    }
  });





  // GET all cars BY therir ID

oldInventryRoute.get("/:id",async(req,res)=>{
    const ID=req.params.id

    try{
        const oldcars =await  InventryModel.findOne({_id:ID}) 
        res.status(200).send({ oldcars });

    }catch(err){
        console.log(err)
        console.log({"error":"Error is coming While Get data"})
        res.status(400).send({err})


    }
})

//// PATCH REQUEST

oldInventryRoute.patch("/update/:id",authentication,async(req,res)=>{
    const ID=req.params.id
    const payload=req.body

    // For Finding Id Building RelationShip
    const car=await InventryModel.findOne({_id:ID})
    console.log(car,"car user id")
    const userID_in_car=car.userID  // car.userID represents the user ID associated with the car
    const userID_making_req=req.body.userID  // userID_making_req represents the user ID from the authenticated request.

    try{
        if(userID_making_req !==userID_in_car){

          res.status(400).send({"Msg":"You are not authorized"})

        }else{
            await InventryModel.findByIdAndUpdate({_id:ID},payload)
            res.status(200).send(`update the car whose ID is ${ID}`)

        }


    }catch(err){

        console.log(err)
        console.log({"error":"Error is coming While Patch car"})
        res.status(400).send({"Msg":"Error is coming While Patch car"})


    }

})

// DELETE REQUEST

oldInventryRoute.delete("/delete/:id",authentication,async(req,res)=>{
    const ID=req.params.id
    //const payload=req.body

    // For Finding Id Building RelationShip
    const car=await InventryModel.findOne({_id:ID})
    console.log(car,"car user id")
    const userID_in_car=car.userID  // car.userID represents the user ID associated with the car
    const userID_making_req=req.body.userID  //userID_making_req represents the user ID from the authenticated request.

    try{
        if(userID_making_req !==userID_in_car){

          res.status(400).send({"Msg":"You are not authorized"})

        }else{
            await InventryModel.findByIdAndDelete({_id:ID})
            res.status(200).send(`DELETE the car whose ID is ${ID}`)

        }


    }catch(err){

        console.log(err)
        console.log({"error":"Error is coming While DELETING car"})
        res.status(400).send({"Msg":"Error is coming While DELETING car"})

    }

})


  


module.exports={
    oldInventryRoute
}