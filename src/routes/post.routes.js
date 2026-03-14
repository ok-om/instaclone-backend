const express = require('express');
const postrouter = express.Router()
const postcontroller = require("../controller/post.controller")
const multer = require("multer")
const upload  = multer({ storage: multer.memoryStorage()})
const identify = require("../middleware/auth.middleware")

postrouter.post("/",upload.single('img'),identify,postcontroller.createPostController)

postrouter.get("/",identify,postcontroller.getpostcontroller)

postrouter.get("/detail/:postid",identify,postcontroller.getdetailPostcontroller)

postrouter.post("/like/:postid",identify,postcontroller.likecontroller)
postrouter.post("/unlike/:postid",identify,postcontroller.unlikecontroller)


postrouter.get("/feed",identify,postcontroller.getfeedcontroller)

module.exports = postrouter;