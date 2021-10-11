module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Shop);
    Product.belongsTo(models.Product_Category);
  };

  return Product;
};
