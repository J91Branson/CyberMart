//Packages Imports
const router = require("express").Router();

//File Imports
const { create, categoryById, read, update, remove, list} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//route to create new category if user is signed in admin
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

//route to display a category
router.get("/category/:categoryId", read);

//route to update specific category  if user is signed in as admin
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);

//route to delete specific category if user is signed in as admin
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove);

//route to display all category
router.get("/categories", list);

//To find profile for a specific param
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
