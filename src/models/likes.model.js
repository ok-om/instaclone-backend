const mongoose = require("mongoose")


const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:[true,"postid is required for like"]
    },
    user:{
        type:String,
        required:[true,"username is required for like"]
    }
},{
    timestamps:true
})

likeSchema.index({post:1,user:1},{unique:true})

const likemodel = mongoose.model("like",likeSchema)

module.exports = likemodel