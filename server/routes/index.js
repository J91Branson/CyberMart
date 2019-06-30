//Packages Imports
const path = require("path");
const router = require("express").Router();

//File Imports
const authRoutes = require("./auth");
const userRoutes = require("./user");
const categoryRoutes = require("./category");
const productRoutes = require("./product");


//Routes
router.use("/api", authRoutes);
router.use("/api", userRoutes);
router.use("/api", categoryRoutes);
router.use("/api", productRoutes);


// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;

