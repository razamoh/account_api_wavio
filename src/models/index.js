const Sequelize = require('sequelize');
const { dbConfig } = require('../config/database');

const sequelize = new Sequelize(dbConfig);

const contractModel = require('./contract');
const jobModel = require('./job');
const profileModel = require('./profile');

const Contract = contractModel(sequelize);
const Profile = profileModel(sequelize);
const Job = jobModel(sequelize);

Job.belongsTo(Contract, { foreignKey: 'ContractId', as: 'Contract' });
Profile.hasMany(Contract, { foreignKey: 'ContractorId', as: 'ContractorContracts' });
Profile.hasMany(Contract, { foreignKey: 'ClientId', as: 'ClientContracts' });

Contract.belongsTo(Profile, { foreignKey: 'ClientId', as: 'Client' });
Contract.belongsTo(Profile, { foreignKey: 'ContractorId', as: 'Contractor' });
Contract.hasMany(Job, { foreignKey: 'ContractId', as: 'jobs' });
module.exports = {
  Profile,
  Contract,
  Job,
  sequelize,
};
