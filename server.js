const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const expressValidator = require("express-validator");
const morgan = require("morgan");

require('dotenv').config();

const routes = require("./server/routes");

const app = express();
const PORT = process.env.PORT || 8000;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(expressValidator());
app.use(cookieParser())



// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.Promise = global.Promise;
mongoose
  .connect((process.env.MONGODB_URI || "mongodb://localhost/cyber-mart"), {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB Connected"));

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on http://localhost:${PORT}!`);
});
