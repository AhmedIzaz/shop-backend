const {
  Product_Category,
  Product,
  Customer,
  Shop,
  Order,
  Owner,
} = require("../models");

const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  try {
    const {
      email,
      password,
      username,
      age,
      picture,
      description,
      contact_number,
    } = req.body;
    const hashed_password = await bcrypt.hash(password, 11);
    const owner = await Owner.create({
      email,
      password: hashed_password,
      username,
      age,
      picture,
      description,
      contact_number,
    });
    owner
      ? res
          .json({ message: "owner has successfully signedup" })
          .status(200)
          .end()
      : res
          .json({ message: "owner signing up is dismissed" })
          .status(404)
          .end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const owner = await Owner.findOne({
      where: { email: email },
    });
    if (owner) {
      const password_matched = await bcrypt.compare(password, owner.password);
      if (password_matched) {
        req.session.ownerLoggedIn = true;
        req.session.owner = owner;

        let customer_id_list = [];
        let order_list = [];
        const customers = await Customer.findAll({
          where: { ShopId: req.session.owner.ShopId },
        });
        const products = await Product.findAll({
          where: { ShopId: req.session.owner.ShopId },
        });

        const orders = await Order.findAll({
          where: { shop_id: owner.ShopId },
        });

        orders.forEach((order) => {
          if (
            customer_id_list.filter((item) => item == order.CustomerId)
              .length == 0
          ) {
            customer_id_list.push(order.CustomerId);
          }
        });

        customer_id_list.forEach((customer_id) => {
          const customer_orders = orders.filter(
            (order) => order.CustomerId == customer_id
          );
          const obj = {
            customer_id: customer_id,
            customer_name: customer_orders[0].customer_name,
            customer_orders: customer_orders,
          };
          order_list.push(obj);
        });
        req.session.save((err) =>
          err
            ? res.json({ error: { message: "session cant save" } })
            : res
                .json({
                  owner: req.session.owner,
                  // order_list is s alist where customers id and their orders list will included
                  order_list: order_list,
                  products: products,
                  customers: customers,
                  ownerLoggedIn: true,
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
            email: "owner email didn't found",
          },
        })
        .end();
    }
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      err
        ? res.json({
            error: "owner cant log out",
          })
        : res.json({
            logout: "owner loged out successfully",
          });
    });
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};
exports.owner_products = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { ShopId: req.session.owner.ShopId },
    });
    return res.json({ products: products }).status(200).end();
  } catch (e) {
    return res.json({ error: e.message }).status(404).end();
  }
};

exports.create_product = async (req, res, next) => {
  try {
    const {
      product_name,
      picture,
      price,
      description,
      available,
      ProductCategoryId,
    } = req.body;
    const new_product = await Product.create({
      product_name,
      picture,
      description,
      price,
      available: available == "yes" ? 1 : 0,
      ShopId: req.session.owner.ShopId,
      ProductCategoryId,
    });
    new_product
      ? res
          .json({
            message: `${new_product.product_name} added to the shop`,
            product: new_product,
          })
          .status(200)
          .end()
      : res
          .json({ message: "cant create the object of product" })
          .status(404)
          .end();
  } catch (e) {
    return res.json({ error: e.message }).status(404).end();
  }
};

exports.delete_product = async (req, res, next) => {
  try {
    await Product.destroy({
      where: { id: req.body.id, ShopId: req.session.owner.ShopId },
    });
    return res.status(200).end();
  } catch (e) {
    return res.json({ error: e.message }).status(404).end();
  }
};

exports.clear_order = async (req, res, next) => {
  try {
    const { product_id_list, customer_id } = req.body;

    await product_id_list.forEach((id) => {
      Order.destroy({
        where: { product_id: parseInt(id), CustomerId: customer_id },
      });
    });

    return res.status(200).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};
