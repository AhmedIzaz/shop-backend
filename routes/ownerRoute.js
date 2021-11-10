const router = require("express").Router();
const {
  signup,
  login,
  logout,
  shop_customers,
  clear_order,
  owner_products,
  create_product,
} = require("../controllers/ownerController");
const {
  isAuthenticated,
  notAuthenticated,
  ownerNotAuthenticated,
} = require("../middlewares/authMiddlewares");

router.post("/clear-order", ownerNotAuthenticated, clear_order);
router.post("/logout", ownerNotAuthenticated, logout);
router.post("/signup", signup);
router.post("/login", isAuthenticated, login);
router.get("/products", ownerNotAuthenticated, owner_products);
router.post("/create-product", ownerNotAuthenticated, create_product);
router.get("/customers", ownerNotAuthenticated, shop_customers);

module.exports = router;
