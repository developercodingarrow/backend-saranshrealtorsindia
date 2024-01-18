const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      require: [true, "Please Tell us your name!"],
    },
    slug: {
      type: String,
      require: [true, "slug didn't work"],
      unique: true,
    },

    blogDescreption: {
      type: String,
    },

    BlogThumblin: {
      url: {
        type: String,
      },
      altText: {
        type: String,
      },
    },
    BlogCoverImage: {
      url: {
        type: String,
      },
      altText: {
        type: String,
      },
    },

    blogTags: [
      {
        type: String,
      },
    ],

    blogCategories: [
      {
        category: {
          type: String,
        },
        slug: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  // Check if blogTitle is provided before generating the slug
  if (this.blogTitle) {
    this.slug = slugify(this.blogTitle, {
      lower: true,
    });
  } else {
    // Generate a random default slug when blogTitle is not provided
    this.slug = slugify(Math.random().toString(36).substring(7), {
      lower: true,
    });
  }

  next();
});

blogSchema.pre("save", function (next) {
  // Check if blogCategories array is empty
  if (!this.blogCategories || this.blogCategories.length === 0) {
    this.blogCategories = [
      {
        category: "uncategorized",
        slug: slugify("uncategorized", { lower: true }),
      },
    ];
  }

  this.blogCategories.forEach((categoryObject, index) => {
    categoryObject.slug = slugify(categoryObject.category, { lower: true });
  });

  next();
});

const Blogs = mongoose.model("Blogs", blogSchema);

module.exports = Blogs;
