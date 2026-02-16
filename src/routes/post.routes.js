const express = require('express');
const postrouter = express.Router()
const postcontroller = require("../controller/post.controller")
const multer = require("multer")
const upload  = multer({ storage: multer.memoryStorage()})

postrouter.post("/",upload.single('img'),postcontroller.createPostController)

postrouter.get("/",postcontroller.getpostcontroller)

postrouter.get("/detail/:postid",postcontroller.getdetailPostcontroller)

module.exports = postrouter;