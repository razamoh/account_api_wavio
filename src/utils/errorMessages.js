module.exports = {
  RETRIEVE_ERROR_CLIENT: {
    statusCode: 400, // Bad Request
    message: 'Error retrieving best clients.',
  },
  RETRIEVE_ERROR_PROFESSION: {
    statusCode: 404, // Not Found
    message: 'Error retrieving best clients.',
  },
  INTERNAL_ERROR: {
    statusCode: 500, // Internal Server Error
    message: 'Internal Server Error.',
  },
  DEPOSIT_EXCEEDED: {
    statusCode: 403,
    message: 'Deposit amount exceeds the limit.',
  },
  ENOUGH_BALANCE: {
    statusCode: 403,
    message: 'You already have enough balance to pay current jobs.',
  },
  CONTRACT_NOT_FOUND: {
    statusCode: 404,
    message: 'Active Contract not found.',
  },
  JOB_PAID_ALREADY: {
    statusCode: 404,
    message: 'This contractor is already paid fully.',
  },
  DEPOSIT_FAILED: {
    statusCode: 400,
    message: 'Deposit failed.',
  },
  CLIENT_NOT_FOUND: {
    statusCode: 404,
    message: 'Active Client not found.',
  },
  JOB_NOT_FOUND: {
    statusCode: 404,
    message: 'Job(s) not found.',
  },
  PROFILE_NOT_FOUND: {
    statusCode: 404,
    message: 'Contract not found.',
  },
  CLIENT_INSUFFICIENT_BALANCE: {
    statusCode: 403,
    message: 'Client has insufficient balance.',
  },
  NO_JOB_TO_PAY: {
    statusCode: 403,
    message: 'No jobs to pay.',
  },
};
