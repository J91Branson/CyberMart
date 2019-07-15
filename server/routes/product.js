//Packages Imports
const router = require("express").Router();

//File Imports
const { create, productById, read, update, remove, list, listAnimal, listBySearchAn, listRelated, listCategories, listBySearch,  listSearch} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//GET METHODS
//route to display a product
router.get("/product/:productId", read);

//route to display all products
router.get("/products", list);

//route to display all products by animal type
router.get("/products/:animal", listAnimal);

//route to display all products searched
router.get("/products/search:params", listSearch);

//route to display all products searched
router.get("/products/search?category=:cat&q=:search", listSearch);

//route to display all related products 
router.get("/products/related/:productId", listRelated);

//route to display all product categories
router.get("/products/categories", listCategories);

//POST METHODS
//route to create new product if user is signed in as admin
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

//route to display all products in search
router.post("/products/by/search", listBySearch);

//route to display all products in search by animal
router.post("/products/by/Ansearch", listBySearchAn);

//PUT METHODS
//route to update new product if user is signed in as admin
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);

//DELETE METHODS
//route to delete new product if user is signed in as admin
router.delete("/product/delete?:productId/:userId", requireSignin, isAuth, isAdmin, remove);

//PARAMS pass on
//To find profile for a specific param 
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
