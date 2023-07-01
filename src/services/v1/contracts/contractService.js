const { Op } = require('sequelize');
const { Contract } = require('@models');
const { CustomError, errorCodes } = require('@utils/errorHandler');
// Get a contract by ID for the given profile
// Service for GET /contracts/:id

async function getContractService(id, profile) {
  const contract = await Contract.findOne({
    where: {
      id,
    },
    [Op.or]: [
      { ContractorId: profile.id },
      { ClientId: profile.id },
    ],
  });

  if (!contract) {
    throw new CustomError(errorCodes.CONTRACT_NOT_FOUND);
  }
  return contract ?? [];
}

// Get contracts belonging to the given profile
async function getContractsService(profile, limit = 10000) {
  const contracts = await Contract.findAll({
    where: {
      [Op.or]: [
        { ClientId: profile.id },
        { ContractorId: profile.id },
      ],
      status: {
        [Op.ne]: 'terminated',
      },
    },
    limit,
  });

  return contracts ?? [];
}
module.exports = {
  getContractService,
  getContractsService,
};
