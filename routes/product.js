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

router.get("/products", products);
router.get("/eachProduct/:id", eachproduct);
router.get("/oneProduct/:id", oneProduct);
router.post("/category", category);

router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
