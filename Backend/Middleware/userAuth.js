let jwt=require("jsonwebtoken")
require("dotenv").config()

const authentication=(req,res,next)=>{
     const token=req.headers.authorization

     if(token){
        //The jwt.verify() function verifies the token's signature and checks if it's valid and not expired.


        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        // If the token is successfully verified then userID extracted from the decoded payload and added to request Body
        if(decoded){
            const userID=decoded.userID
            console.log(decoded)
            req.body.userID=userID
            next()
        }else{
            res.send("Please Login First")
        }

     }else{
        res.send("Please Login First")
     }
}

module.exports={
    authentication
}