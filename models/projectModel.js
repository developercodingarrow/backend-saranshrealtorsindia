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
      // require: [true, "Please Tell us your project Price!"],
    },
    pricePrefix: {
      type: String,
    },

    reraNo: {
      type: String,
    },

    city: {
      type: String,
      // require: [true, "Please Tell us your project Name!"],
    },

    slugCity: {
      type: String,
      require: [true, "city slug didn't work!"],
    },

    projectLocation: {
      type: String,
      // require: [true, "Please Tell us your project Name!"],
    },

    slugProjectLocation: {
      type: String,
      // require: [true, "Please Tell us your project Name!"],
    },

    builder: {
      type: String,
      // require: [true, "Please Tell us your Builder Name!"],
    },

    slugBuilder: {
      type: String,
      // require: [true, "Please Tell us your Builder Name!"],
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
    typesofUnits: ["2 BHK", "3 BHK", "4 BHK"],
    slugtypesofUnits: [],
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
      default: "Upcoming Project",
    },
    slugProjectStatus: {
      type: String,
      // require: [true, "slug didn't work"],
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

// slug the pormotional page Title
projectSchema.pre("save", function (next) {
  this.slug = slugify(this.projectTitle, {
    lower: true,
  });
  next();
});

projectSchema.pre("save", function (next) {
  this.slugCity = slugify(this.city, {
    lower: true,
  });
  next();
});

projectSchema.pre("save", function (next) {
  this.slugProjectLocation = slugify(this.projectLocation, {
    lower: true,
  });
  next();
});

projectSchema.pre("save", function (next) {
  this.slugBuilder = slugify(this.builder, {
    lower: true,
  });
  next();
});

projectSchema.pre("save", function (next) {
  this.slugProjectStatus = slugify(this.projectStatus, {
    lower: true,
  });
  next();
});

projectSchema.pre("save", function (next) {
  if (this.isModified("typesofUnits")) {
    this.slugtypesofUnits = this.typesofUnits.map((unit) =>
      slugify(unit, { lower: true })
    );
  }
  next();
});

const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
