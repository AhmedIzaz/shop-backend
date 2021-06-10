const {
  Product_Category,
  Product,
  Customer,
  Shop,
  Order,
} = require("../models");

exports.dashboard = async (req, res, next) => {
  try {
    const product_category = await Product_Category.findAll();
    const product = await Product.findAll();
    product_category && product
      ? res
          .json({ product_category: product_category, product: product })
          .status(200)
          .end()
      : res.json({ message: "cant get the objects " }).status(404).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};
