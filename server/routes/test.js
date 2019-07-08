//Packages Imports
const router = require("express").Router();

//File Imports
const { create, productById, read, update, remove, list, listAnimal, listBySearchAn, listRelated, listCategories, listBySearch,  listSearch} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//route to display all products in search by animal
router.post("/products/by/Ansearch", listBySearchAn);

module.exports = router;