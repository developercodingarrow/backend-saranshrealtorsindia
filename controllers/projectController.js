const Projects = require("../models/projectModel");
const Factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

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

// exports.deleteGalleryImage = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const imageId = req.body.id;

//   const data = await Projects.findById(id);
//   if (!data) {
//     return next(new AppError("There is no data", 404));
//   }

//   // Find the image in the galleryPhotos array
//   const deletedImage = data.ProjectCoverImage.find(
//     (photo) => photo._id.toString() === imageId
//   );

//   // Remove the image from the galleryPhotos array
//   data.ProjectCoverImage = data.ProjectCoverImage.filter(
//     (photo) => photo._id.toString() !== imageId
//   );

//   // Save the updated document
//   await data.save();

//   res.status(200).json({
//     results: data.length,
//     status: "Success",
//     message: "Delete Image",
//     result: data,
//   });
// });

exports.deleteProjectCoverImage = Factory.deleteGalleryImage(
  Projects,
  "ProjectCoverImage"
);

// Example usage for deleting FloorPlanImages
exports.deleteFloorPlanImage = Factory.deleteGalleryImage(
  Projects,
  "floorPlanImages"
);

exports.deleteProjectThumblin = Factory.deleteSingleImage(
  Projects,
  "ProjectThumblin",
  "project-thumblin"
);
