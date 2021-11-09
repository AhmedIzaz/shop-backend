const router = require("express").Router();
const {
  signup,
  login,
  logout,
  ownerDashboard,
  all_orders,
  clear_order,
} = require("../controllers/ownerController");
const {
  isAuthenticated,
  notAuthenticated,
  ownerNotAuthenticated,
} = require("../middlewares/authMiddlewares");

router.post("/clear-order", ownerNotAuthenticated, clear_order);
router.get("/orders", notAuthenticated, all_orders);
router.post("/logout", ownerNotAuthenticated, logout);
router.post("/signup", signup);
router.post("/login", isAuthenticated, login);
router.get("/dashboard", ownerNotAuthenticated, ownerDashboard);

module.exports = router;
