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

module.exports = router;