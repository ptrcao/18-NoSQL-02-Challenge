// /api/users

const router = require("express").Router();

const {
  getAllUsers,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id
router.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUser);

//
router.route("/:id/friends/:friendid").post(addFriend).delete(deleteFriend);

module.exports = router;
