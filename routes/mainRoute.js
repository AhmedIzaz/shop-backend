const dashboard = require("./dashboardRoute");
const productRoute = require("./productRoute");
const productCategoryRoute = require("./productCategoryRoute");
const customerRoute = require("./customerRoute");
const ownerRoute = require("./ownerRoute");

const routers = [
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
  routers.map((router) => {
    app.use(router.path, router.handler);
  });
};
