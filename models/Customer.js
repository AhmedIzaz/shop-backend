module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        min: 8,
        max: 64,
      },
      username: {
        type: DataTypes.STRING,
        min: 3,
        max: 20,
        required: true,
        allowNull: false,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
    },
    {
      timestamps: false,
    }
  );

  Customer.associate = (models) => {
    Customer.belongsTo(models.Shop);
    Customer.hasMany(models.Order);
    Customer.hasMany(models.Cart);
  };

  return Customer;
};
