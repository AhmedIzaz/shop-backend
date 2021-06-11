const router = require("express").Router()
const {signup, login, logout, ownerDashboard, all_orders, clear_order} = require("../controllers/ownerController")

router.post("/order/clear_order/:order_id", clear_order)
router.get("/orders", all_orders)
router.post("/logout", logout)
router.post("/signup", signup)
router.post("/login", login)
router.get("/dashboard", ownerDashboard)


module.exports = router