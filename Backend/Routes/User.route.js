const express=require("express")

var jwt=require("jsonwebtoken")
require("dotenv").config()
const bcrypt=require("bcrypt")
const { UserModel } = require("../Model/User.Model")



const userRouter=express.Router()



userRouter.post("/signup", async (req, res) => {

    const { name, email, password,profilePic } = req.body;
    try {
      const existingUser = await UserModel.findOne({ email }); // Check if user with the same email exists
      if (existingUser) {
        // User with the same email already exists
        res.send({Message:"User already exists"});
      } else {
        // Encrypt password
        bcrypt.hash(password, 5, async (err, newsecure_password) => {

          if (err) {
            console.log(err);
            res.send({Error:"Error while encrypting password"});

          } else {
             // store hash in your database

            const user = new UserModel({ name, email, password: newsecure_password,profilePic });
            await user.save();
            res.send( { Message: "You are registered" });
          }
        });
      }
    } catch (err) {
      res.send({ Error: "Error while registering" });
      console.log(err);
    }
  });
  


  // LOGIN Section

userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body

    try{
        const user= await UserModel.find({email})
        const hashed_pass=user[0].password
        console.log(user)

        if(user.length>0){
            bcrypt.compare(password,hashed_pass,(err,result) =>{
                // random payload change to userid
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.SECRET_KEY);
                    res.send({"Msg":"Login Successfully","token":token})
                }else{
                    res.send({Error:"Wrong Credentials"})
                }
            })
        }else{
            res.send({Error:"Wrong Credentials"})
        }

    
    
    }catch(err){
        console.log({"Error":"Error While Login"})
        console.log(err)
    }
})



module.exports={
    userRouter
}
