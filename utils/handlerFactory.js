const catchAsync = require("./catchAsync");
const AppError = require("./appError");

// This function for CRETE one
exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      result: doc,
    });
  });
};

// This function for GET ALL
exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.find();
    res.status(201).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });
};

// This function for GET ALL
exports.getOneBySlug = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      total: doc.length,
      result: doc,
    });
  });
};

// This function for Delete one
exports.deleteOneByBody = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.body.id);

    if (!doc) {
      return next(new AppError("NO Document found with this ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: {
        data: doc,
      },
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

// Generic function to update a document's thumbnail image by slug for any model and field name
exports.updateThumblinByIdAndField = (Model, fieldName) => {
  return catchAsync(async (req, res, next) => {
    console.log(req);
    const image = req.files[0].filename;
    const id = req.params.id;
    // Create an object with the dynamically provided field name
    const updateObject = {
      [fieldName]: {
        url: image,
        altText: req.files[0].originalname,
      },
    };
    // Find and update the document based on the provided slug
    const data = await Model.findByIdAndUpdate(id, updateObject, {
      new: true,
      upsert: true,
    });

    // Respond with a success message and the updated data
    return res.status(200).json({
      status: "Success",
      message: `${fieldName} updated successfully`,
      data,
    });
  });
};

// Generic function to upload cover images for any model and field name
exports.uploadGalleryByIdAndField = (Model, fieldName) => {
  return catchAsync(async (req, res, next) => {
    const galleryImages = req.files;
    const id = req.params.id;
    const images = galleryImages.map((file) => ({
      url: file.filename,
      altText: req.body.altText,
      descreption: req.body.descreption,
    }));

    // Use findByIdAndUpdate to find the document by ID and update it
    const data = await Model.findByIdAndUpdate(
      id,
      {
        $push: { [`${fieldName}`]: { $each: images } },
      },
      { new: true }
    );

    if (!data) {
      return res
        .status(404)
        .json({ status: "error", message: `${fieldName} not found` });
    }

    res.status(201).json({
      status: "success",
      data,
    });
  });
};
