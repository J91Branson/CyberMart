//Packages Imports
const router = require("express").Router();

//File Imports
const { create, productById, read, update, remove, list, listRelated, listCategories, listBySearch, photo } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//route to create new product if user is signed in as admin
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

//route to display a product
router.get("/product/:productId", read);

//route to update new product if user is signed in as admin
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);

//route to delete new product if user is signed in as admin
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove);

//route to display all products
router.get("/products", list);

//route to display all products 
router.get("/products/related/:productId", listRelated);

//route to display all product categories
router.get("/products/categories", listCategories);

//route to display all products in search
router.post("/products/by/search", listBySearch);

//route to return product photo
router.get("/product/photo/:productId", photo);

//To find profile for a specific param 
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
