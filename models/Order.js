const { Product_Category, Product } = require(".");
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      product_category_id: {
        type: DataTypes.UUID,
        
      },
      product_category_name:DataTypes.STRING,
      product_id: {
        type: DataTypes.UUID,
      },
      product_name:DataTypes.STRING
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Customer);
  };
};
