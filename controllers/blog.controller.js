const { blogService } = require("../services");
const path = require("path");
const fs = require("fs");
const uploadImage = require("../middlewares/cloudinary")

// ADD blog

const addBlog = async (req, res) => {
  try {
       ReqBody = req.body;
    let image = await uploadImage(req.file);
     console.log(image,"image");
    const body = {
      image: image.secure_url,
      title: req.body.title,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
    };
    console.log("blog");
    const blog = await blogService.addBlog(body);

    if (!blog) {
      throw new Error("Something went wrong");
    }

    res.status(201).json({
      message: "blog Created success",
      data: blog,
    });
  }catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

// GET blog

const getBlog = async (req, res) => {
  const blog = await blogService.getBlog();
  console.log(blog, "blog get");
  res.render("./index.ejs", { message: blog });
  // res.render('index.ejs', { title: 'Employee Records', records:blog });
  // res.status(200).json({
  //   message: "blog get success",
  //   data: blog,
  // });
};

// UPDATE blog

const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log(id, body);
    const blog = await blogService.updateBlog(id, body);
    res.status(200).json({
      message: "blog updated success",
      data: blog,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE blog
const deleteBlog = async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;

    const blog = await blogService.deleteBlog(id);
    if (!blog) {
      throw new Error("something went wrong");
    }
res.render("./index.ejs")
    // res.status(200).json({
    //   message: "blog delete success",
    //   data: blog,
    // });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const SearchUser = async (req, res) => {
  try {
    const { name, email, phone } = req.query;

    if (!name && !email && !phone) {
      return res.status(400).json({
        message: "At least one search parameter is required",
      });
    }
    let query = {};
    if (name) {
      query.name = name;
    }
    if (email) {
      query.email = email;
    }
    if (phone) {
      query.phone = phone;
    }
    const user = await blogService.SearchUser(query);

    if (user.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }

    res.status(200).json({
      success: true,
      message: "User Data searching successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// search using http://localhost:3001/v1/blog/blogList?page=1

const pagination = async (req, res) => {
  try {
    const blog = await blogService.getBlog();
    console.log(blog, "blog get");
    const page = req.query.page;
    const size = 3;
    const pages = parseInt(page);

    const Index = (pages - 1) * size;

    if (page < 1) {
      return res
        .status(400)
        .json({ message: "Page number must be greater than or equal to 1" });
    }

    const item = await blogService.pagination(Index, size);
    // res.status(200).json({
    //   success: true,
    //   message: "User Data Pagination successfully!",
    //   data: item,
    // });
    res.render("./index.ejs", { message: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
  SearchUser,
  pagination
};
