const router = require("express").Router();
const usersController = require("../controllers/userController");
const authController = require("../controllers/authController");

// Matches with "/api/users"
router.route("/user")
  .get(usersController.list)
  .post(usersController.create);

// Matches with "/api/users/:id"
router
  .route("/user/:id")
  .get(authController.requireSignin, usersController.userByID)
  .put(authController.requireSignin, authController.hasAuthorization, usersController.update)
  .delete(authController.requireSignin, authController.hasAuthorization, usersController.remove);

module.exports = router;
