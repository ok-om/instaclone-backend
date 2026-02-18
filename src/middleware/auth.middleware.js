const jwt = require("jsonwebtoken")

async function identify(req,res,next) {
        const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({
            msg:"Unauthorized access..."
        })
    }

    let decode=null;
    try{
         decode =  jwt.verify(token,process.env.JWT_SECRETE)
}catch(err){
  return  res.status(401).json({
        msg:"Token is invalid..."
    })
}

req.user = decode
next()
}

module.exports = identify