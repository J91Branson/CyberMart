//Packages Imports
const router = require("express").Router();

//File Imports
const { create, categoryById, read, update, remove, list} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//GET METHODS
//route to display a category
router.get("/category/:categoryId", read);

//route to display all categories
router.get("/categories", list);

//POST METHODS
//route to create new category if user is signed in admin
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

//PUT METHODS
//route to update specific category  if user is signed in as admin
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);

//DELETEMETHODS
//route to delete specific category if user is signed in as admin
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove);

//PARAMS pass ons
//To find profile for a specific param
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
