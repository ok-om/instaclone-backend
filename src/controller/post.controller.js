const postmodel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken");
const likemodel = require("../models/likes.model")

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
        user: req.user.id
 })


 res.status(201).json({
    msg:"post is created",
    post
 })


}

async function getpostcontroller(req,res) {

    const post = await postmodel.find({
        user:req.user.id
    })
    
    res.status(200).json({
        msg:"post is fetched successfully...",
        post
    })
}

async function getdetailPostcontroller(req,res) {
 
const user = req.params.postid
 
    const post = await postmodel.findById(user)



    if(!post){
        return res.status(404).json({
            msg:"post not found"
        })
    }

    const isvaliduser  = post.user.toString() === req.user.id


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

async function likecontroller(req,res) {
    const username = req.user.username
    const postid = req.params.postid

    const ispost = await postmodel.findById(postid)

    if(!ispost){
        return res.status(404).json({
            msg:"post not found"
        })
    }

    const islike = await likemodel.findOne({
        post:postid,
        user:username
    })

    if(islike){
        return res.status(201).json({
            msg:"you already like this post"
        })
    }

    const like = await likemodel.create({
        post:postid,
        user:username
    })

    res.status(200).json({
        msg:"you liked post successfully..",
        like
    })
    
}

async function unlikecontroller(req,res) {
    const postid = req.params.postid
    const username = req.user.username

    const isLiked =  await likemodel.findOne({
        post:postid,
        user:username
    })

    if(!isLiked){
        return res.status(400).json({
            message: "Post didn't like"
        })
    }

    await likemodel.findOneAndDelete({_id:isLiked._id})

    return res.status(200).json({
        message:"post unliked successfully"
    })

}

async function getfeedcontroller(req,res) {
   
    const user = req.user


      const posts = await Promise.all((await postmodel.find({}).populate("user").lean()).map(async(post)=>{

       const isLiked = await likemodel.findOne({
        user:user.username,
        post:post._id
       })

         post.isLiked = Boolean(isLiked)

         return post
      }))

      res.status(200).json({
        msg:"posts fetched successfully.",
        posts
      })
}
module.exports ={
    createPostController,
    getpostcontroller,
    getdetailPostcontroller,
    likecontroller,
    getfeedcontroller,
    unlikecontroller
}