const jwt=require("jsonwebtoken");
require("dotenv").config();

const adminauthonticate=(req,res,next)=> {
  const token=req.headers.authorization
  
  if(token){
    const decode=jwt.verify(token,process.env.key)
    if(decode){
        const userId=decode.userId
        console.log(decode)
        req.body.userId=userId
        next()
    }
    else{
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }
  else{
    return res.status(401).send({ message: 'Unauthorized' });
  }
}


module.exports={
  adminauthonticate
}