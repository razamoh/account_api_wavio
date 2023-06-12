const Sequelize = require('sequelize');

const ContractModel = (sequelize) => {
  const contract = sequelize.define('Contract', {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('new', 'in_progress', 'terminated'),
    },
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
      {
        fields: ['createdAt'],
      },
    ],
  });

  return contract;
};

module.exports = ContractModel;
