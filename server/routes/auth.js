//Packages Imports
const router = require("express").Router();

//File Imports
const { signup, signin, signout, socialLogin} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

//GET METHODS
//Route to sign out current user (admin or customer)
router.get("/signout", signout);

//POST METHODS
//Route to sign up new user as customer
router.post("/signup", userSignupValidator, signup);

//Route to sign in current user (admin or customer)
router.post("/signin", signin);

router.post('/social-login', socialLogin);


module.exports = router;
