const express = require("express");
const route = express.Router();
const { blogController } = require("../controllers");
const validation = require("../middlewares/validate");
const { blogValidation } = require("../validation");
const { upload } = require("../middlewares/multer");

route.post("/add", upload.single("image"), validation(blogValidation.addBlog) ,blogController.addBlog);
route.get("/get", blogController.getBlog);
route.post("/update/:id", validation(blogValidation.addBlog),blogController.updateBlog);
route.post("/delete/:id", blogController.deleteBlog);
route.get("/search" , blogController.SearchUser)
route.get("/blogList" ,blogController.pagination)

module.exports = route;
