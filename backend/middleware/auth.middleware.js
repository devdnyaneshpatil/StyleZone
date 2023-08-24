var jwt = require('jsonwebtoken');


const auth=(req,res,next)=>{
  const token= req.headers.authorization?.split(" ")[1]
  try {
    var decoded = jwt.verify(token, 'conpic');
    if(decoded){
        req.email=decoded.email
        req.ID=decoded.ID
        //console.log(decoded)
        next()
    }else{
        res.status(200).json({msg:"You have to Login first!!"})
    } 
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

module.exports=auth