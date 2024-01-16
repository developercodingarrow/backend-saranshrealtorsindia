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
exports.uploadThumblin = Factory.updateThumblinBySlugAndField(
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
