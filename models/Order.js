const { Product_Category, Product } = require(".");
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      product_id: DataTypes.UUID,
      product_name: DataTypes.STRING,
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      CustomerId: {
        type: DataTypes.UUID,
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
