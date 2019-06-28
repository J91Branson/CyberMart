//Packages Imports
const router = require("express").Router();

//File Imports
const { signup, signin, signout, requireSignin} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

//Route to sign up new user as customer
router.post("/signup", userSignupValidator, signup);

//Route to sign in current user (admin or customer)
router.post("/signin", signin);

//Route to sign out current user (admin or customer)
router.get("/signout", signout);

//Token && Email test -- both need to be valid to sign in
// router.get("/test", requireSignin, (req, res) => {
//     res.setEncoding("unauth-token")
// })

module.exports = router;
