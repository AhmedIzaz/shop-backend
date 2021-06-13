const {
  Product_Category,
  Product,
  Customer,
  Shop,
  Order,
} = require("../models");
const bcrypt = require("bcrypt");

exports.login_customer = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const customer = await Customer.findOne({
      where: { email: email }
    });
    const password_matched = await bcrypt.compare(
      password,
      customer.password
    );
    password_matched
      ? res.json({ login: true }).status(200).end()
      : res.json({ login: false }).status(404).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.logout_customer = async (req, res, next) => {
  try {
    console.log("will continue");
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.signup_customer = async (req, res, next) => {
  try {
    const {email, password, username, age, picture, contact_number, ShopId} = req.body
    const hashed_password = await bcrypt.hash(password, 11);
    const new_customer = await Customer.create({
      email,
      password:hashed_password,
      username,
      age,
      picture,
      contact_number,
      ShopId
    });
    !new_customer
      ? res
          .json({
            message: "there are something went wrong to signup as a customer",
          })
          .status(404)
          .end()
      : res.json({ message: "customer created successfully" });
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.customer_dashboard = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ where: { id: 2 } });
    const orders = await customer.getOrders();
    orders || customer
      ? res.json({customer:customer, orders:orders}).status(200).end()
      : res.json({ message: "customer has no order" }).status(404).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.create_order = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.product_id } });
    const product_category = await product.getProduct_Category();
    const new_order = await Order.create({
      product_category_id: product_category.id,
      product_category_name: product_category.product_category_name,
      product_id: product.id,
      product_name: product.product_name,
      CustomerId:2
    });
    new_order
      ? res.json(new_order).status(200).end()
      : res.json({ message: "cant create the order" }).status(404).end();
  } catch (e) {
    res.json({ error: e.message });
  }
};

exports.customers_orders = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({where:{id:req.params.customer_id}})
    const customers_orders = await customer.getOrders()
    customers_orders
      ? res.json(customers_orders).status(200).end()
      : res.json({ message: " customer has no orders yet" });
  } catch (e) {
    res.json(e.message);
  }
};
