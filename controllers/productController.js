const {
  Product_Category,
  Product,
  Customer,
  Shop,
  Order,
} = require("../models");

exports.get_one_product = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.product_id },
    });
    product
      ? res.json(product).status(200).end()
      : res
          .json({ message: "cant get the object of product" })
          .status(404)
          .end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.products = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    products || products.length == 0
      ? res.json(products).status(200).end()
      : res
          .json({ message: "cant get the objects of product" })
          .status(404)
          .end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};
