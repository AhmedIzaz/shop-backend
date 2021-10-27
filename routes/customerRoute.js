const router = require("express").Router();
const {
  login_customer,
  logout_customer,
  signup_customer,

  create_order,
  customers_orders,

  change_cart_quantity,
  create_customers_cart,
  remove_cart_from_customer_cart,
  update_customer_orders_quantity,
  delete_customer_cart,
} = require("../controllers/customerController");

const {
  isAuthenticated,
  notAuthenticated,
} = require("../middlewares/authMiddlewares");

router.post("/customer-signup", isAuthenticated, signup_customer);
router.post("/customer-login", isAuthenticated, login_customer);
router.post("/customer-logout", notAuthenticated, logout_customer);

router.post("/create-customer-cart", notAuthenticated, create_customers_cart);

router.post("/change-cart-quantity", notAuthenticated, change_cart_quantity);
router.post(
  "/remove-cart-from-customer-cart",
  notAuthenticated,
  remove_cart_from_customer_cart
);

router.post("/delete-customer-cart", notAuthenticated, delete_customer_cart);
router.get("/customer-orders", notAuthenticated, customers_orders);

router.post("/create-order/", notAuthenticated, create_order);

module.exports = router;
