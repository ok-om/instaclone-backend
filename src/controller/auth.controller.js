const usermodel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

async function registercontroller(req,res){
  const {username,email,password,bio,profile} = req.body
  const isuseralredyexist  = await usermodel.findOne({
    $or:[
        {username},
        {email}
  ]
  })

  if(isuseralredyexist){
    res.status(401).json({
        msg:"user is already exist" + (isuserexists.email === email ? " with email..." : "with username...")
    })
  }
 
  const hash = crypto.createHash("sha256").update(password).digest("hex")
  const user  = await usermodel.create({
         username,
         email,
         password:hash,
         bio,
         profile
  })

  const token =  jwt.sign({
    id:user._id
  },process.env.JWT_SECRETE,{expiresIn:"1d"})

  res.cookie("token",token);

  res.status(201).json({
    msg:"user is registered...",
    user:{
      email:user.email,
      username:user.username,
      bio:user.bio,
      profile:user.profile
    }
  })

}



async function logincontroller(req,res){
  const {email,username,password} = req.body

  const user = await usermodel.findOne({
    $or:[
      {
        username:username
      },
      {
        email:email
      }
    ]
  })

  if(!user){
    return res.status(404).json({
      msg:"user is not found"
    })
  }

  const checkpassword = user.password == crypto.createHash("sha256").update(password).digest("hex")

  if(!checkpassword){
    return res.status(401).json({
      msg:"password is not correct..."
    })
  }
  
  const token = jwt.sign({
    id:user._id
  },process.env.JWT_SECRETE,{expiresIn:"1d"})

  res.cookie("token",token)

  res.status(200).json({
    msg:"login successfully...",
    user:{
      username:user.username,
      email:user.email,
      bio:user.bio,
      profile:user.profile
    }
  })

}

module.exports = {
    registercontroller,
    logincontroller
}