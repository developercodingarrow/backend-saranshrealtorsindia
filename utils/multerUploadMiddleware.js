const multer = require("multer");
const path = require("path");

// Function to create Multer storage
const createMulterStorage = (destination, context) => {
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(destination));
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${context}-${Date.now()}-${file.originalname}`);
    },
  });
  return multerStorage;
};

// Function to create Multer upload middleware
const createMulterUpload = (
  storage,
  fieldName,
  isMultiple = true,
  maxCount = 1
) => {
  const upload = isMultiple
    ? multer({ storage: storage }).array(fieldName, maxCount)
    : multer({ storage: storage }).single(fieldName);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        console.error("Multer Error:", err); // Log any multer-related errors
        return res.status(400).send("File upload error");
      }
      next();
    });
  };
};

// project Thumblin
const thumblinStorage = createMulterStorage(
  `${__dirname}/../../frontend-saranshrealtorsindia/public/project-thumblin`,
  "project-thumblin"
);

const thumbilUpload = createMulterUpload(
  thumblinStorage,
  "ProjectThumblin",
  true
);

exports.thumblinMidelwear = thumbilUpload;

// For Covers
const ProjectCoverImageStorage = createMulterStorage(
  `${__dirname}/../../frontend-saranshrealtorsindia/public/project-cover-images`,
  "Project-CoverImage"
);

const projectCoverImagesUpload = createMulterUpload(
  ProjectCoverImageStorage,
  "ProjectCoverImage",
  true,
  4
);
exports.projectCoverImageMidelwear = projectCoverImagesUpload;

// For Floor Plan
const ProjectFloorPlanImageStorage = createMulterStorage(
  `${__dirname}/../../frontend-saranshrealtorsindia/public/project-floorPlan-Images`,
  "floorPlan-Images"
);

const projectFloorPlanImagesUpload = createMulterUpload(
  ProjectFloorPlanImageStorage,
  "floorPlanImages",
  true,
  10
);
exports.projectFloorPlanImageMidelwear = projectFloorPlanImagesUpload;
