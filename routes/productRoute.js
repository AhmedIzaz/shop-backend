const { products } = require("../controllers/productController");

const router = require("express").Router();

router.get("/products", products);

module.exports = router;
