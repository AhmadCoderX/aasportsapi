const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
} = require("../controllers/users.controller");

router.route("/").get(getAllUsers).post(createUser);
router.route("/profile").get(getUserProfile);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
