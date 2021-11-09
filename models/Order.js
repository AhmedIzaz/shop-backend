const { Product_Category, Product } = require(".");
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      product_id: {
        type: DataTypes.UUID,
        required: true,
      },
      product_name: {
        type: DataTypes.STRING,
        required: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customer_name: {
        type: DataTypes.STRING,
        required: true,
      },

      shop_id: {
        type: DataTypes.STRING,
        required: true,
      },
      delivery_date: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Customer);
  };
  return Order;
};
