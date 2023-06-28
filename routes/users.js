var express = require("express");
const verifyToken = require("../middleware/Authenticated");
const {
  users,
  oneUser,
  updateUser,
  createUser,
  deleteUser,
} = require("../controller/indexController");
var router = express.Router();

/* GET users listing. */
router.get("/", verifyToken, function (req, res, next) {
  res.json({ user: req.user });
});

router.get("/users", users);
router.get("/oneUser/:id", oneUser);
router.put("/users/:id", updateUser);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
