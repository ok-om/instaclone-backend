const postmodel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_KEY
})
async function createPostController(req,res){
 console.log(req.body,req.file)

const token = req.cookies.token

if(!token){
    return res.status(401).json({
        msg:"you dont have access to it reason not Login/Registered"
    })
}
  let decode = null

 try{
     decode  = jwt.verify(token,process.env.JWT_SECRETE)
 }catch(err){
   return res.status(401).json({
    msg:"token is not authorized"
   })
 }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),"file"),
    fileName: 'Test',
    folder:"instaclone"
 })


  const post = await postmodel.create({ 
      caption: req.body.filehai,
        img_url:file.url,
        userid: decode.id
 })


 res.status(201).json({
    msg:"post is created",
    post
 })


}

async function getpostcontroller(req,res) {
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

    const post = await postmodel.find({
        userid:decode.id
    })
    
    res.status(200).json({
        msg:"post is fetched successfully...",
        post
    })
}

async function getdetailPostcontroller(req,res) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            msg:"Unauthorized access..."
        })
    }
    
    const userid = req.params.postid
 let decode = null;

try{
    decode =  jwt.verify(token,process.env.JWT_SECRETE) 
}catch(err){
    return res.status(401).json({
       msg:"Invalid Token...."
    })
}

   

    const post = await postmodel.findById(userid)



    if(!post){
        return res.status(404).json({
            msg:"post not found"
        })
    }

    const isvaliduser  = post.userid.toString() === decode.id


    if(!isvaliduser){
        return res.status(403).json({
            msg:"user not have permission to access this..."
        })
    }


    return res.status(200).json({
        msg:"post fetched successfully...",
        post
    })

}
module.exports ={
    createPostController,
    getpostcontroller,
    getdetailPostcontroller
}