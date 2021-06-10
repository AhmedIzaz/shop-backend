const router = require("express").Router()
const {login_customer, logout_customer, signup_customer, customer_dashboard} = require("../controllers/customerController")

router.post("/create-order", )
router.get("/orders", )
router.post("/customer-logout", logout_customer)
router.post("/customer-signup", signup_customer)
router.post("/customer-login", login_customer)
router.get("/customer-dashboard", customer_dashboard)

module.exports = router