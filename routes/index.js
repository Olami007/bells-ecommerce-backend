var express = require("express");
const {
  products,
  eachproduct,
  category,
  createProduct,
  updateProduct,
  deleteProduct,
  oneProduct,
} = require("../controller/indexController");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/products", products);
router.get("/oneProduct/:id", oneProduct);

router.get("/eachProduct/:id", eachproduct);
router.post("/category", category);

router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
