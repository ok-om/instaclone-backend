const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username is Already Used..."],
        required:[true,"username is Required..."]
    },
    email:{
         type:String,
        unique:[true,"Email is Already Used..."],
        required:[true,"Email is Required..."]
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        select:false
    },
   bio:{
    type:String,
    default:"test_bio"
   },
   profile:{
    type:String,
    default: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
   }
})

const usermodel = mongoose.model("user",userSchema);

module.exports = usermodel