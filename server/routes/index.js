const path = require("path");
const router = require("express").Router();
const signup = require("./user");
const signin = require("./auth");
// const google = require("./google");

// API Routes
router.use("/api", signup);
router.use("/api", signin);
// router.use("/auth", google);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;

