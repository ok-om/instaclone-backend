const express = require("express")
const userrouter = express.Router()
const identifyuser = require("../middleware/auth.middleware")
const  followcontroller  = require("../controller/follow.controller")


userrouter.post("/follow/:username",identifyuser,followcontroller.followusercontroller)

userrouter.post("/unfollow/:username",identifyuser,followcontroller.unfollowusercontroller)


module.exports = userrouter