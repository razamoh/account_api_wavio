const { Op, col, fn } = require('sequelize');
const {
  Contract,
  Job,
  Profile,
  sequelize,
} = require('@models');

const { CustomError, errorCodes } = require('@utils/errorHandler');

// Get the profession that earned the most money for any contractor in the given time range
async function getBestProfessionService(start, end, limit = 1) {
  try {
    const professionColumn = 'Contract.Contractor.profession';

    const result = await Job.findAll({
      attributes: [
        [col(professionColumn), 'profession'],
        [fn('SUM', col('price')), 'total'],
      ],
      include: [
        {
          model: Contract,
          as: 'Contract',
          attributes: [],
          include: [
            {
              model: Profile,
              as: 'Contractor',
              attributes: [],
            },
          ],
        },
      ],
      where: {
        paid: 1,
        paymentDate: {
          [Op.between]: [start, end],
        },
      },
      group: [col(professionColumn)],
      order: [[col('total'), 'DESC']],
      limit,
    });

    return result;
  } catch (error) {
    throw new CustomError(errorCodes.RETREIVE_ERROR_PROFESSION);
  }
}

// Get the best clients based on the total amount paid within the given time range
async function getBestClientsService(start, end, limit = 2) {
  try {
    const bestClients = await Job.findAll({
      attributes: [
        [sequelize.col('Contract->Client.id'), 'id'],
        [sequelize.fn('sum', sequelize.col('price')), 'totalPaid'],
        [sequelize.literal('firstName || " " || lastName'), 'fullName'],
      ],
      where: {
        paid: 1,
        paymentDate: {
          [Op.between]: [start, end],
        },
      },
      include: [
        {
          model: Contract,
          as: 'Contract',
          attributes: [],
          include: [
            {
              model: Profile,
              as: 'Client',
              attributes: [],
            },
          ],
        },
      ],
      group: ['Contract->Client.id', 'fullName'],
      order: [[sequelize.literal('totalPaid'), 'DESC']],
      limit,
    });

    return bestClients || [];
  } catch (error) {
    throw new CustomError(errorCodes.RETREIVE_ERROR_CLIENT);
  }
}

module.exports = {
  getBestProfessionService,
  getBestClientsService,
};
