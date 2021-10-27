const { Product, Customer, Cart, Order } = require("../models");
const bcrypt = require("bcrypt");

// =========================
//==========================

exports.login_customer = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({
      where: { email: email },
    });
    if (customer) {
      const password_matched = await bcrypt.compare(
        password,
        customer.password
      );
      if (password_matched) {
        const carts = await Cart.findAll({
          where: { CustomerId: customer.id },
        });
        req.session.isLoggedIn = true;
        req.session.customer = customer;
        req.session.save((err) =>
          err
            ? res.json({ error: { message: "session cant save" } })
            : res
                .json({
                  customer: req.session.customer,
                  carts: carts,
                  isLoggedIn: true,
                })
                .end()
        );
      } else {
        res
          .json({
            error: {
              password: "password didn't matched",
            },
          })
          .end();
      }
    } else {
      res
        .json({
          error: {
            email: "customer email didn't found",
          },
        })
        .end();
    }
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

// =========================
//==========================

exports.logout_customer = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      err
        ? res.json({
            error: "customer cant log out",
          })
        : res.json({
            logout: "customer loged out successfully",
          });
    });
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

// =========================
//==========================

exports.signup_customer = async (req, res, next) => {
  try {
    const { email, password, username, contact_number } = req.body;

    const hashed_password = await bcrypt.hash(password, 11);
    const new_customer = await Customer.create({
      email,
      password: hashed_password,
      username,
      contact_number,
      ShopId: 1,
    });

    if (!new_customer) {
      res
        .json({
          message: "there are something went wrong to signup as a customer",
        })
        .status(404)
        .end();
    }

    await new_customer.save();
    res.json(new_customer).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

// =========================
//==========================

exports.customers_orders = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      where: { id: req.session.customer.id },
    });
    const orders = await customer.getOrders();
    orders
      ? res.json({ orders: orders }).status(200).end()
      : res.json({ message: "customer has no order" }).status(404).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

// =========================
//==========================

exports.create_customers_cart = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const product = await Product.findOne({ where: { id: product_id } });
    if (product) {
      const cart = await Cart.create({
        customer_name: req.session.customer.username,
        product_id: product.id,
        product_name: product.product_name,
        picture: product.picture,
        price: product.price,
        CustomerId: req.session.customer.id,
      });
      return res.json({ cart: cart }).status(200).end();
    }
    return res.json({ message: "cant add to cart" }).status(404).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

// =========================
//==========================

exports.change_cart_quantity = async (req, res, next) => {
  try {
    const { cart_id, previous_quantity, type } = req.body;
    await Cart.update(
      {
        quantity:
          type == "increament"
            ? parseInt(previous_quantity) + 1
            : parseInt(previous_quantity) - 1,
      },
      {
        where: {
          CustomerId: req.session.customer.id,
          id: cart_id,
        },
      }
    );
    const carts = await Cart.findAll({
      where: { CustomerId: req.session.customer.id },
    });
    res.json({ carts: carts }).status(200).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};
// =========================
//==========================
exports.remove_cart_from_customer_cart = async (req, res, next) => {
  try {
    const { cart_id } = req.body;
    await Cart.destroy({
      where: {
        id: cart_id,
      },
    });
    const carts = await Cart.findAll({
      where: { CustomerId: req.session.customer.id },
    });
    return res.json({ carts: carts }).status(200).end();
  } catch (e) {
    return res.json({ error: e.message }).status(404).end();
  }
};
// =========================
//==========================

exports.delete_customer_cart = async (req, res, next) => {
  try {
    await Cart.destroy({
      where: { CustomerId: req.session.customer.id },
    });
    return res.status(200).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};
// data would be list where every objects is ordered item where product id and quantity will include...

exports.create_order = async (req, res, next) => {
  try {
    const { data } = req.body;
    await data.forEach(async (productItem) => {
      const product = await Product.findOne({
        where: { id: productItem.id },
      });

      await Order.create({
        product_id: product.id,
        product_name: product.product_name,
        quantity: productItem.quantity,
        CustomerId: req.session.customer.id,
      });
    });
    const customers_orders = await Order.findAll({
      where: { CustomerId: req.session.customer.id },
    });
    res.json(customers_orders).end();
  } catch (e) {
    res.json({ error: e.message });
  }
};

// =========================
//==========================

// =========================
//==========================
