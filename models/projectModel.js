const mongoose = require("mongoose");
const slugify = require("slugify");

const projectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      require: [true, "Please Tell us your project Name!"],
    },
    slug: {
      type: String,
      require: [true, "slug didn't work"],
      unique: true,
    },
    projectDescription: {
      type: String,
    },
    price: {
      type: Number,
    },
    pricePrefix: {
      type: String,
    },

    reraNo: {
      type: String,
    },

    city: {
      type: String,
    },

    projectLocation: {
      type: String,
    },

    builder: {
      type: String,
    },

    basicPrice: {
      type: String,
    },
    projectArea: {
      type: String,
    },
    floors: {
      type: Number,
    },
    unitsNo: {
      type: Number,
    },
    typesofUnits: {
      type: [String],
      default: [],
    },
    Possession: {
      type: String,
    },

    featured: {
      type: Boolean,
      enum: [false, true],
      default: false,
    },
    projectStatus: {
      type: String,
      enum: ["Upcoming Project", "Ready to move", "under construction"],
      default: "Upcoming Project",
    },

    ProjectThumblin: {
      url: {
        type: String,
      },
      altText: {
        type: String,
      },
    },

    ProjectCoverImage: [
      {
        url: {
          type: String,
          default: "project-dummy-image.jpg",
        },
        altText: {
          type: String,
          default: "project-cover-image",
        },
      },
    ],

    floorPlanImages: [
      {
        url: {
          type: String,
          default: "floor-plan-dummy-image.jpg",
        },
        altText: {
          type: String,
          default: "floor-plan-image",
        },
      },
    ],
  },
  { timestamps: true }
);

projectSchema.pre("save", function (next) {
  // Check if projectTitle is provided before generating the slug
  if (this.projectTitle) {
    // Generate slug from projectTitle
    const baseSlug = slugify(this.projectTitle, {
      lower: true,
    });

    const randomString = new Date().getTime().toString(36).substring(7);
    this.slug = `${baseSlug}-${randomString}`;
  } else {
    // Generate a random default slug with timestamp when projectTitle is not provided
    this.slug = slugify(new Date().getTime().toString(36).substring(7), {
      lower: true,
    });
  }

  next();
});

projectSchema.pre("save", function (next) {
  if (this.typesofUnits && this.typesofUnits.length > 0) {
    this.typesofUnits = this.typesofUnits.map((unitType) =>
      unitType.toLowerCase()
    );
  }
  next();
});

const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
