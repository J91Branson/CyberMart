const router = require("express").Router();
const userRoutes = require("./userRoutes");

// User routes
router.use("/users", userRoutes);

module.exports = router;
