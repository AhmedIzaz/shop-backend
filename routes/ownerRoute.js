const router = require("express").Router()
const {signup, login, logout, ownerDashboard} = require("../controllers/ownerController")


router.post("/logout", logout)
router.post("/signup", signup)
router.post("/login", login)
router.get("/dashboard", ownerDashboard)


module.exports = router