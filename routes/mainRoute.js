const router = require("express").Router()
const dashboard = require("./dashboardRoute")
const productRoute = require("./productRoute")
const productCategoryRoute = require("./productCategoryRoute")


router.use("/product", productRoute)
router.use("/category", productCategoryRoute)
router.use("/customer", )
router.use("/owner", )
router.use("/", dashboard)


module.exports = router