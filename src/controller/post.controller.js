const postmodel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_KEY
})
async function createPostController(req,res){

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),"file"),
    fileName: 'Test',
    folder:"instaclone"
 })


  const post = await postmodel.create({ 
      caption: req.body.filehai,
        img_url:file.url,
        userid: req.user.id
 })


 res.status(201).json({
    msg:"post is created",
    post
 })


}

async function getpostcontroller(req,res) {

    const post = await postmodel.find({
        userid:req.user.id
    })
    
    res.status(200).json({
        msg:"post is fetched successfully...",
        post
    })
}

async function getdetailPostcontroller(req,res) {
 
const userid = req.params.postid
 
    const post = await postmodel.findById(userid)



    if(!post){
        return res.status(404).json({
            msg:"post not found"
        })
    }

    const isvaliduser  = post.userid.toString() === req.user.id


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