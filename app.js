const express = require("express");
const app = express();
const globalErrorHandler = require("./utils/errorController");
const UserRoute = require("./routes/UserRoutes");
const ProjectRoute = require("./routes/ProjectRoutes");

const cors = require("cors");

// Midelwears
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/saranshrealtorsindia/user", UserRoute);
app.use("/api/v1/saranshrealtorsindia/project", ProjectRoute);

// global Error Control
app.use(globalErrorHandler);

module.exports = app;
