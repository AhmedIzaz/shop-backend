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
    const customer = await Customer.findOne({
      where: { email: req.body.email },
    });
    const password_matched = await bcrypt.compare(
      req.body.password,
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
    const hashed_password = await bcrypt.hash(req.body.password);
    const new_customer = await Customer.create({
      email,
      password: hashed_password,
      username,
      age,
      picture,
      contact_number,
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
    const customer = await Customer.findOne({ where: { id: 1 } });
    const orders = await customer.getOrders();
    orders
      ? res.json(orders).status(200).end()
      : res.json({ message: "customer has no order" }).status(404).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};
