//Packages Imports
const router = require("express").Router();

//File Imports
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, read, update } = require("../controllers/user");

//Route to find admin user
router.get("/secret/:userId", requireSignin, isAuth, isAdmin,(req, res) => {
    res.json({
        user: req.profile
    });
});

// router.get("/user/:userId", requireSignin, isAuth, read);
// router.put("/user/:userId", requireSignin, isAuth, update);

//To find profile for a specific param
router.param("userId", userById);

module.exports = router;
