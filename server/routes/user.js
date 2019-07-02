//Packages Imports
const router = require("express").Router();

//File Imports
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, read, update, purchaseHistory } = require("../controllers/user");

//GET METHODS
//Route to find admin user
router.get("/secret/:userId", requireSignin, isAuth, isAdmin,(req, res) => {
    res.json({
        user: req.profile
    });
});

//route to display user profile 
router.get("/user/:userId", requireSignin, isAuth, read);

//route to display user order history
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory)

//PUT METHODS
//route to update user profile 
router.put("/user/:userId", requireSignin, isAuth, update);

//PARAMS pass on
//To find profile for a specific param
router.param("userId", userById);

module.exports = router;
