const router = require("express").Router()
const dashboard = require("./dashboardRoute")
const productRoute = require("./productRoute")
const productCategoryRoute = require("./productCategoryRoute")
const customerRoute = require("./customerRoute")
const ownerRoute = require("./ownerRoute")

router.use("/product", productRoute)
router.use("/category", productCategoryRoute)
router.use("/customer", customerRoute)
router.use("/owner", ownerRoute)
router.use("/", dashboard)


module.exports = router