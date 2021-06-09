module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
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
        type: DataTypes.Text,
        allowNull: true,
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
    Product.belongsTo(models.Category);
  };

  return Product;
};
