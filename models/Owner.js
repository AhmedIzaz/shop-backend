module.exports = (sequelize, DataTypes) => {
  const Owner = sequelize.define(
    "Owner",
    {
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        min: 8,
      },
      name: {
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
      },
      description: {
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

  Owner.associate = (models) => {
    Owner.belongsTo(models.Shop);
  };

  return Owner;
};
