const router = require("express").Router()
const dashboard = require("./dashboardRoute")

router.use("/product", )
router.use("/category", )
router.use("/customer", )
router.use("/owner", )
router.use("/", dashboard)


module.exports = router