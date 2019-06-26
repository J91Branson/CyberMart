//Packages Imports
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const expressValidator = require("express-validator");
const morgan = require("morgan");
require('dotenv').config();

//File Imports
const routes = require("./server/routes");

//Global variables
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(expressValidator());
app.use(cookieParser())

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routes
app.use(routes);

// Mongo DB
mongoose.Promise = global.Promise;
mongoose
  .connect((process.env.MONGODB_URI || process.env.DATABASE), {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB Connected"));

// Start server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on http://localhost:${PORT}!`);
});
