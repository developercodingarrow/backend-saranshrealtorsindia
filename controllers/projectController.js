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
exports.uploadThumblin = catchAsync(async (req, res, next) => {
  const image = req.files[0].filename;
  const slug = req.params.slug;
  console.log(req.files);
  const data = await Projects.findOneAndUpdate(
    { slug: slug },
    {
      ProjectThumblin: {
        url: image,
        altText: req.files[0].originalname,
      },
    }
  );
  return res.status(200).json({
    status: "Success",
    message: "Project Thumblin image Update Succesfully",
    data,
  });
});
// 6) UPDATE PROJECT GALLERY API

// 7)UPDATE PROJECT FLOOR PLAN API
