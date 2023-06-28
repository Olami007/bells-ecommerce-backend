var express = require("express");
const {
  register,
  login,
  verification,
} = require("../controller/indexController");
var router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verification", verification);

module.exports = router;
