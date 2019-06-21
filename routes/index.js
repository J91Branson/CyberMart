const path = require("path");
const router = require("express").Router();
const apiUser = require("./apiUser");
const authLogin = require("./authLogin");
const authGoogle = require("./authGoogle");

// API Routes
router.use("/api", apiUser);
router.use("/auth", authLogin);
router.use("/auth", authGoogle);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;

