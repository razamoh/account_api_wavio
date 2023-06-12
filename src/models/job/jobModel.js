const { Sequelize, DataTypes } = require('sequelize');

const jobModel = (sequelize) => {
  const job = sequelize.define('Job', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    paymentDate: {
      type: Sequelize.DATE,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  });
  return job;
};

module.exports = jobModel;
