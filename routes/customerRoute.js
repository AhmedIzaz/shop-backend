const router = require("express").Router();
const {
  login_customer,
  logout_customer,
  signup_customer,
  customer_dashboard,
  create_order,
  customers_orders,
} = require("../controllers/customerController");

const {
  isAuthenticated,
  notAuthenticated,
} = require("../middlewares/authMiddlewares");

router.post("/customer-signup", signup_customer);
router.post("/customer-login", login_customer);
router.post("/customer-logout", logout_customer);

router.get("/customer-dashboard", notAuthenticated, customer_dashboard);
router.get("/orders/:customer_id", notAuthenticated, customers_orders);
router.post("/create-order/:product_id", notAuthenticated, create_order);

module.exports = router;
