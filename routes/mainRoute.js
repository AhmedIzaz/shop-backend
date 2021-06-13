const { dashboard } = require("../controllers/dashboardController");
const productRoute = require("./productRoute");
const productCategoryRoute = require("./productCategoryRoute");
const customerRoute = require("./customerRoute");
const ownerRoute = require("./ownerRoute");
const { route } = require("./customerRoute");

const router = [
  {
    path: "/product",
    handler: productRoute,
  },
  {
    path: "/category",
    handler: productCategoryRoute,
  },
  {
    path: "/customer",
    handler: customerRoute,
  },
  {
    path: "/owner",
    handler: ownerRoute,
  },
  {
    path: "/",
    handler: dashboard,
  },
];

module.exports = (app) => {
  router.map((route) => {
    route.path === "/"
      ? app.get(route.path, route.handler)
      : app.use(route.path, route.handler);
  });
};
