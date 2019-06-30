//Packages Imports
const router = require("express").Router();

//File Imports
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { generateToken, processPayment  } = require("../controllers/payment");

//GET METHOD
//route for receive payment token for signed in customer
router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken);

//GET METHOD
//route to process payment for signed in customer
router.post("/braintree/payment/:userId",requireSignin, isAuth, processPayment);

//PARAMS pass ons
//To find profile for a specific param
router.param("userId", userById);

module.exports = router;