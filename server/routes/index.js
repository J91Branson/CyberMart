//Packages Imports
const path = require("path");
const router = require("express").Router();

//File Imports
const authRoutes = require("./auth");
const userRoutes = require("./user");
const categoryRoutes = require("./category");
const productRoutes = require("./product");
const paymentRoutes = require("./payment");
const orderRoutes = require("./order");
const animalRoutes = require("./animals");
const testRoutes = require("./test");

//Routes
router.use("/api", authRoutes);
router.use("/api", userRoutes);
router.use("/api", categoryRoutes);
router.use("/api", animalRoutes);
router.use("/api", productRoutes);
router.use("/api", paymentRoutes);
router.use("/api", orderRoutes);
router.use("/api", testRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;

