module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      customer_name: {
        type: DataTypes.STRING,
        required: true,
      },
      product_id: {
        type: DataTypes.UUID,
        required: true,
      },
      product_name: {
        type: DataTypes.STRING,
        min: 3,
        max: 30,
        required: true,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      ShopId: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    {
      timestamps: false,
    }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.Customer);
  };

  return Cart;
};
