const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const {
  blogthumblinMidelwear,
  blogCoverMidelwear,
} = require("../utils/multerUploadMiddleware");

router.post("/create-blog", blogController.createBlog);
router.get("/all-blogs", blogController.getAllBlogs);
router.get("/single-blogs/:id", blogController.getBlog);
router.get("/blog-detail/:slug", blogController.blogDetails);
router.delete("/delete-blog", blogController.deleteBlog);
router.patch("/update-blog/:id", blogController.updateBlog);

router.patch(
  "/update-blog-thumblin/:id",
  blogthumblinMidelwear,
  blogController.UplodblogThumblin
);

router.patch(
  "/update-blog-cover-image/:id",
  blogCoverMidelwear,
  blogController.UplodblogCoverImage
);

router.delete("/delete-blog-thumblin/:id", blogController.deleteBlogThumblin);
router.delete(
  "/delete-blog-cover-image/:id",
  blogController.deleteBlogCoverImage
);

module.exports = router;
