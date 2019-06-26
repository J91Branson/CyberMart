//Packages Imports
const router = require("express").Router();

//File Imports
const { create, productById, read, update, remove } = require("../controllers/product");
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

//To find profile for a specific param 
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
