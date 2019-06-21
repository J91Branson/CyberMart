const router = require("express").Router();
const { list, create, userByID, read, update, remove } = require("../controllers/userController");
const { requireSignin, hasAuthorization} = require("../controllers/authController");

// Matches with "/api/users"
router.route("/users")
  .get(list)
  .post(create);

// Matches with "/api/users/:id"
router.route("/users/:id")
  .get(requireSignin, userByID)
  .put(requireSignin, hasAuthorization, update)
  .delete(requireSignin, hasAuthorization, remove);

module.exports = router;
