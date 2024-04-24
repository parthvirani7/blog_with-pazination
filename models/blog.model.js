const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 3
    },
    name: {
      type: String,
      
      minlength: 3
    },
    image: {
      type: String, 

    },
    description: {
      type: String,

    },
    category:{
      type: String,

    }
  },
  {
    timestamps: true,
  }
);

const blog = mongoose.model("blogSchema", blogSchema);

module.exports = blog
