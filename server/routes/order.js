//Packages Imports
const router = require("express").Router();

//File Imports
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { create, listOrders, getStatusValues, orderById, updateOrderStatus } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

//GET METHOD
//route to display all orders for user admin access
router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);

//route to display status for user order
router.get("/order/status-values/:userId", requireSignin, isAuth, isAdmin, getStatusValues);

//POST METHOD
//route to create order and save it to customer account and update stock quantity
router.post("/order/create/:userId", requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create);

//PUT METHOD
//route to update order status
router.put("/order/:orderId/status/:userId", requireSignin, isAuth, isAdmin, updateOrderStatus);

//PARAMS pass ons
//To find profile for a specific param
router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;