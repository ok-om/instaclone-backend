const mongoose = require('mongoose');

const postschema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    img_url:{
        type:String,
        required:[true,"img must be required for post"]
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"user id required for posting"]
    }
})

const postmodel = mongoose.model("post",postschema);