const fs = require("fs").promises;
const path = require("path");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Projects = require("../models/projectModel");
const Factory = require("../utils/handlerFactory");

//1) CREATE PROJECT API
exports.createProject = Factory.createOne(Projects);
//2) DELETE PROJECT API
exports.deleteProject = Factory.deleteOneByBody(Projects);
//3) GET ALL PROJECT API
exports.getAllProjets = Factory.getAll(Projects);
//4) GET SINGLE PROJECT API
exports.getProject = Factory.getOneBySlug(Projects);
//5) UPDATE PROJECT THUMBLIN API
exports.uploadThumblin = Factory.updateThumblinByIdAndField(
  Projects,
  "ProjectThumblin"
);
// 6) UPDATE PROJECT GALLERY API
exports.uploadCoverImages = Factory.uploadGalleryByIdAndField(
  Projects,
  "ProjectCoverImage"
);
// 7)UPDATE PROJECT FLOOR PLAN API
exports.uploadFloorPlanImages = Factory.uploadGalleryByIdAndField(
  Projects,
  "floorPlanImages"
);

exports.deleteGalleryImage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const imageId = req.body.id;

  const data = await Projects.findById(id);
  if (!data) {
    return next(new AppError("There is no data", 404));
  }

  // Find the image in the galleryPhotos array
  const deletedImage = data.ProjectCoverImage.find(
    (photo) => photo._id.toString() === imageId
  );

  // Remove the image from the galleryPhotos array
  data.ProjectCoverImage = data.ProjectCoverImage.filter(
    (photo) => photo._id.toString() !== imageId
  );

  // Save the updated document
  await data.save();

  // Delete the image file from the folder
  const imagePath = path.resolve(
    `${__dirname}/../../frontend-saranshrealtorsindia/public/project-cover-images/${deletedImage.url}`
  );

  try {
    await fs.unlink(imagePath);
    console.log(`Image deleted: ${deletedImage.url}`);
  } catch (error) {
    console.error(`Error deleting image: ${error.message}`);
  }

  res.status(200).json({
    results: data.length,
    status: "Success",
    message: "Delete Image",
    result: data,
  });
});
