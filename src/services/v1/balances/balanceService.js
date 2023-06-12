const { Op } = require('sequelize');
const { CustomError, errorCodes } = require('@utils/errorHandler');

const updateProfileBalance = async (userId, balance, transaction, profile) => {
  await profile.update({ balance }, { where: { id: userId }, transaction });
};

const getClient = async (userId, profile) => {
  const client = await profile.findOne({ where: { id: userId, type: 'client' } });
  if (!client) {
    throw new CustomError(errorCodes.CLIENT_NOT_FOUND);
  }
  return client;
};

const calculateMaxDepositAmount = (sumJobsToPay) => (sumJobsToPay * 0.25) ?? 0;

const validateDepositAmount = (amount, maxDepositAmount) => {
  if (amount > maxDepositAmount) {
    throw new CustomError(errorCodes.DEPOSIT_EXCEEDED);
  }
};

const validateClientBalance = (client, sumJobsToPay, maxDepositAmount) => {
  const clientBalance = client.balance ?? 0;
  if (clientBalance > (sumJobsToPay + maxDepositAmount)) {
    throw new CustomError(errorCodes.ENOUGH_BALANCE);
  }
};

const depositToClient = async (userId, amount, models) => {
  const {
    Profile, Job, Contract, sequelize,
  } = models;
  const client = await getClient(userId, Profile);
  if (!client) {
    throw new CustomError(errorCodes.CLIENT_NOT_FOUND);
  }
  const sumJobsToPay = await Job.sum('price', {
    where: {
      paid: {
        [Op.is]: 0,
      },
    },
    include: [
      {
        model: Contract,
        as: 'Contract',
        where: {
          status: 'in_progress',
          ClientId: userId,
        },
      },
    ],
  });

  const maxDepositAmount = calculateMaxDepositAmount(sumJobsToPay);

  validateDepositAmount(amount, maxDepositAmount);

  validateClientBalance(client, sumJobsToPay, maxDepositAmount);

  const profileBalance = Number.isNaN(client.dataValues.balance) ? 0 : client.dataValues.balance;
  const currentBalance = parseFloat(profileBalance ?? 0) + parseFloat(amount ?? 0);
  const transaction = await sequelize.transaction();

  try {
    await updateProfileBalance(userId, currentBalance, transaction, Profile);
    await transaction.commit();
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw new CustomError(errorCodes.INTERNAL_ERROR);
  }

  return { message: 'Deposit successful.' };
};

module.exports = {
  depositToClient,
};
