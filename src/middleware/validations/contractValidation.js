const { param, validationResult } = require('express-validator');

const validateGetContractById = [
  param('id').isInt({ min: 1 }).withMessage('Contract ID must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

// Validation middleware for GET /contracts
const validateGetContracts = [];

module.exports = {
  validateGetContractById,
  validateGetContracts,
};
