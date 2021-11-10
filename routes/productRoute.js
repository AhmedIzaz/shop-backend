const {
  get_one_product,
  products,
  create_product,
} = require("../controllers/productController");

const router = require("express").Router();

router.get("/get-product/:product_id", get_one_product);
router.get("/products", products);

module.exports = router;
