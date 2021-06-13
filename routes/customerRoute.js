const router = require("express").Router();
const {
  login_customer,
  logout_customer,
  signup_customer,
  customer_dashboard,
  create_order,
  customers_orders,
} = require("../controllers/customerController");

router.post("/create-order/:product_id", create_order);
router.get("/orders/:customer_id", customers_orders);
router.post("/customer-logout", logout_customer);
router.post("/customer-signup", signup_customer);
router.post("/customer-login", login_customer);
router.get("/customer-dashboard", customer_dashboard);

module.exports = router;
