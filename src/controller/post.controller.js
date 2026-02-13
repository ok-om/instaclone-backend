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
   res.status(401).json({
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



module.exports ={
    createPostController
}