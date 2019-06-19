const router = require("express").Router();
const userRoutes = require("./usersAPI");

// User routes
router.use("/users", userRoutes);

module.exports = router;
