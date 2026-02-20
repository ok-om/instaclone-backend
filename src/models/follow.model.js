const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower:{
        type:String
    },
    following:{
        type:String
    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["accept","pending","reject"],
            msg:"status can me pending,accepted or rejected"
        }
    }
},{
    timestamps:true
})

followSchema.index({follower:1,following:1},{unique:true})

const followmodel = mongoose.model("Follow",followSchema)

module.exports = followmodel