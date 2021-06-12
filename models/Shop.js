module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    "Shop",
    {
      shop_name: {
        type: DataTypes.STRING,
        min: 3,
        max: 50,
        required: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        min: 3,
        required: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        min: 3,
        max: 50,
        required: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Shop.associate = (models) => {
    Shop.hasOne(models.Owner);
    Shop.hasMany(models.Product_Category);
    Shop.hasMany(models.Product);
    Shop.hasMany(models.Customer);
  };

  return Shop;
};
