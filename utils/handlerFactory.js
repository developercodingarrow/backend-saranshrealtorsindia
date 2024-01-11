const catchAsync = require("./catchAsync");
const AppError = require("./appError");

// This function for Delete one
exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.body.id);

    if (!doc) {
      return next(new AppError("NO Document found with this ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};

// This function for Update one
exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("NO Document found with this ID", 404));
    }

    res.status(204).json({
      status: "success",
      result: doc,
    });
  });
};
