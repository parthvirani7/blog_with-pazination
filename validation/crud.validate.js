const Joi = require("joi");

const addBlog = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.string(),
    description: Joi.string(),
    category: Joi.string().required(),
  }),
};
module.exports = {
  addBlog,
};
