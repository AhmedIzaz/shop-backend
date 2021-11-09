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
        // const orders = await Order.findAll({
        //   where: { ShopId: owner.ShopId },
        // });
        let customer_id_list = [];
        let order_list = [];
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
// exports.login = async (req, res, next) => {
//   try {
//     const owner = await Owner.findOne({ where: { email: req.body.email } });
//     const matched_password = await bcrypt.compare(
//       req.body.password,
//       owner.password
//     );
//     owner && matched_password
//       ? res.json({ ownerLogin: true }).status(200).end()
//       : res.json({ ownerLogin: false }).status(404).end();
//   } catch (e) {
//     res.json({ error: e.message }).status(404).end();
//   }
// };

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
exports.ownerDashboard = async (req, res, next) => {
  try {
    let customer_id_list = [];
    let order_list = [];

    const orders = await Order.findAll({
      where: { ShopId: 1 },
    });

    orders.forEach((order) => {
      if (
        customer_id_list.filter((item) => item == order.CustomerId).length == 0
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
        customer_orders: customer_orders,
      };
      order_list.push(obj);
    });
    // order_list is s alist where customers id and their orders list will included
    return res.json({ order_list: order_list }).status(200).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.all_orders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ["product_category_name", "product_name"],
    });
    orders || orders.length == 0
      ? res.json(orders).status(200).end()
      : res.json({ message: "cant get the orders" });
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
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
