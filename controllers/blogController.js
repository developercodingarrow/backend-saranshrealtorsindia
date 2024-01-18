const Blogs = require("../models/blogModel");
const Factory = require("../utils/handlerFactory");

//1) CREATE PROJECT API
exports.createBlog = Factory.createOne(Blogs);

exports.deleteBlog = Factory.deleteOneByBody(Blogs);

exports.getAllBlogs = Factory.getAll(Blogs);

exports.getBlog = Factory.getOneBySlug(Blogs);

exports.updateBlog = Factory.updateOne(Blogs);

exports.UplodblogThumblin = Factory.updateThumblinByIdAndField(
  Blogs,
  "BlogThumblin"
);

exports.UplodblogCoverImage = Factory.updateThumblinByIdAndField(
  Blogs,
  "BlogCoverImage"
);
