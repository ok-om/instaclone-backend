const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"follower is required"]
    },
    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Following is required"]
    }
},{
    timestamps:true
})

const followmodel = mongoose.model("Follow",followSchema)

module.exports = followmodel