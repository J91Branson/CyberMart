//Packages Imports
const router = require("express").Router();

//File Imports
const { create, animalById, read, update, remove, list} = require("../controllers/animal");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//GET METHODS
//route to display a animal
router.get("/animal/:animalId", read);

//route to display all categories
router.get("/animals", list);

//POST METHODS
//route to create new animal if user is signed in admin
router.post("/animal/create/:userId", requireSignin, isAuth, isAdmin, create);

//PUT METHODS
//route to update specific animal  if user is signed in as admin
router.put("/animal/:animalId/:userId", requireSignin, isAuth, isAdmin, update);

//DELETEMETHODS
//route to delete specific animal if user is signed in as admin
router.delete("/animal/:animalId/:userId", requireSignin, isAuth, isAdmin, remove);

//PARAMS pass ons
//To find profile for a specific param
router.param("animalId", animalById);
router.param("userId", userById);

module.exports = router;