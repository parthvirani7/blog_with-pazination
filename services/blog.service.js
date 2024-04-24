const { blogSchema } = require("../models");

const addBlog = (ReqBody) => {
  return blogSchema.create(ReqBody);
};

const getBlog = () => {
  return blogSchema.find();
};

const updateBlog = (id, body) => {
  return blogSchema.findByIdAndUpdate(id, body);
};
const deleteBlog = (id) => {
  return blogSchema.findByIdAndDelete(id);
};

const SearchBlog = async (query) => {
  return blogSchema.find(query);
};

const pagination = async (Index, size) => {
  return blogSchema.find().skip(Index).limit(size);
};

module.exports = {
  addBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  SearchBlog,
  pagination,
};
