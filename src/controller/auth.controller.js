const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs");
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
 
  const hash = await bcrypt.hash(password,10)
  const user  = await usermodel.create({
         username,
         email,
         password:hash,
         bio,
         profile
  })

  const token =  jwt.sign({
    id:user._id,
    username:user.username
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

  const checkpassword = await bcrypt.compare(password,user.password)

  if(!checkpassword){
    return res.status(401).json({
      msg:"password is not correct..."
    })
  }
  
  const token = jwt.sign({
    id:user._id,
    username:user.username
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

async function getmecontroller(req,res) {
  const userid = req.user.id

  const user = await usermodel.findById(userid)

  if(!user){
    return res.status(404).json({
      msg:"user not found"
    })
  }

  res.status(200).json({
    msg:"user account get fetched...",
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
    logincontroller,
    getmecontroller
}