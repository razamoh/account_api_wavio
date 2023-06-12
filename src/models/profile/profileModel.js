const { DataTypes } = require('sequelize');

const profileModel = (sequelize) => {
  const profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('client', 'contractor'),
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  });
  return profile;
};

module.exports = profileModel;
