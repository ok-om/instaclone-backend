const express = require('express');
const postrouter = express.Router()
const postcontroller = require("../controller/post.controller")
const multer = require("multer")
const upload  = multer({ storage: multer.memoryStorage()})

postrouter.post("/",upload.single('img'),postcontroller.createPostController)



module.exports = postrouter;