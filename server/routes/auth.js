const router = require("express").Router();

const { signup, signin, signout, requireSignin} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);


// router.get("/test", requireSignin, (req, res) => {
//     res.setEncoding("unauth-token")
// })

module.exports = router;
