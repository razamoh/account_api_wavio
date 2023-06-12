const { CustomError, errorCodes } = require('@utils/errorHandler');

// Get all unpaid jobs for active contracts
const getUnpaidJobsService = async (models) => {
  try {
    const { Job, Contract } = models;
    const unpaidJobs = await Job.findAll({
      include: [
        {
          model: Contract,
          as: 'Contract',
          where: {
            status: 'in_progress',
          },
        },
      ],
      where: {
        paid: false,
      },
    });

    return unpaidJobs;
  } catch (error) {
    throw new Error('Query error');
  }
};

const fetchJobAndContract = async (jobId, userId, models) => {
  const {
    Job, Contract, Profile,
  } = models;
  const job = await Job.findByPk(jobId, {
    include: [
      {
        model: Contract,
        as: 'Contract',
        include: [
          {
            model: Profile,
            as: 'Client',
            where: {
              id: userId,
            },
          },
          {
            model: Profile,
            as: 'Contractor',
          },
        ],
      },
    ],
  });

  if (!job) {
    throw new CustomError(errorCodes.CONTRACT_NOT_FOUND);
  }

  if (job.paid) {
    throw new CustomError(errorCodes.JOB_PAID_ALREADY);
  }

  return job;
};

const checkClientBalance = (client, jobAmount) => {
  if (client.balance < jobAmount) {
    throw new CustomError(errorCodes.CLIENT_INSUFFICIENT_BALANCE);
  }
};

const updateBalances = async (client, contract, contractor, jobAmount, transaction, models) => {
  const updatedClientBalance = client.balance - jobAmount;
  const updatedContractorBalance = contractor.balance + jobAmount;
  const {
    Job, Profile,
  } = models;
  await Promise.all([
    Profile.update(
      { balance: updatedClientBalance },
      {
        where: {
          id: client.id,
        },
        transaction,
      },
    ),
    Profile.update(
      { balance: updatedContractorBalance },
      {
        where: {
          id: contractor.id,
        },
        transaction,
      },
    ),
    Job.update(
      {
        paymentDate: new Date().toISOString(),
        paid: true,
      },
      {
        where: {
          ContractId: contract.id,
        },
        transaction,
      },
    ),
  ]);
};

const payForJobService = async (jobId, userId, models) => {
  // Fetch the job and associated contract
  const job = await fetchJobAndContract(jobId, userId, models);
  const {
    sequelize,
  } = models;
  if (!job) {
    throw new CustomError(errorCodes.JOB_NOT_FOUND);
  }

  const contract = job?.Contract;
  const client = contract?.Client?.dataValues;
  const contractor = contract?.Contractor?.dataValues;

  if (!contract) {
    throw new CustomError(errorCodes.CONTRACT_NOT_FOUND);
  }

  if (!client) {
    throw new CustomError(errorCodes.CLIENT_NOT_FOUND);
  }

  console.log('job', job.price);
  // Check if the client's balance is sufficient
  checkClientBalance(client, job.price);

  const transaction = await sequelize.transaction();

  try {
    // Update the balances in the database within the transaction
    await updateBalances(client, contract, contractor, job.price, transaction, models);
    await transaction.commit();
    return { message: 'Jobs paid.' };
  } catch (error) {
    // Rollback the transaction if an error occurs
    await transaction.rollback();
    throw new Error(errorCodes.CLIENT_INSUFFICIENT_BALANCE);
    // return res.status(500).json({ error: 'An error occurred while processing the payment' });
  }
};

module.exports = {
  getUnpaidJobsService,
  payForJobService,
};
