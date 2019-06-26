//Packages Imports
const path = require("path");
const router = require("express").Router();

//File Imports
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");



// const signup = require("./auth");
// const signout = require("./auth");
// const signin = require("./auth");

// const secret = require("./user");
// const userID = require("./user");
// const google = require("./google");


//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);


// router.use("/api", signup);
// router.use("/api", signin);
// router.use("/api", signout);
// router.use("/api", secret);
// router.use("/api", userID);
// router.use("/auth", google);




// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;

