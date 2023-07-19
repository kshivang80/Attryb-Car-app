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
        res.send({message:"User already exists"});
      } else {
        // The code uses bcrypt.hash() to encrypt the provided password
        bcrypt.hash(password, 5, async (err, newsecure_password) => {

          if (err) {
            console.log(err);
            res.send({message:"Error while encrypting password"});

          } else {
             // store hash in your database

            const user = new UserModel({ name, email, password: newsecure_password,profilePic });
            await user.save();
            res.send( { message: "You are registered" });
          }
        });
      }
    } catch (err) {
      res.send({ message: "Error while registering" });
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
          // bcrypt.compare() = compares the plain password with the hashed version.
            bcrypt.compare(password,hashed_pass,(err,result) =>{

              if (err) {
                res.send('something went wrong , try again');
              }
                // random payload change to userid
                if(result){
                //the code generates a JSON Web Token (JWT) using the jwt.sign() function
         
                    const token=jwt.sign({userID:user[0]._id},process.env.SECRET_KEY);
                    //const token = jwt.sign({userID:user[0]._id}, process.env.SECRET_KEY, { expiresIn: '1h' });  // expires token in 1hours
                   
                   res.send({ success: true, message: 'Valid User',token });
                }else{
                  res.send({ success: false, message: 'Invalid User' });
                }
            })
        }else{
          console.log({"Error":"Error While Login",err})
          return res.status(500).send({ success: false, message: 'Invalid User' });
        }

    
    
    }catch(err){
      res.send({message:"Email is not valid"})
        console.log(err)
    }
})




userRouter.get("/single/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let user = await UserModel.findById(id);
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});



module.exports={
    userRouter
}
