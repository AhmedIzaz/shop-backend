const {
  get_one_product,
  products,
  create_product,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/create-product", create_product);
router.get("/product/:product_id", get_one_product);
router.get("/products", products);

module.exports = router;
