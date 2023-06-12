const {
  body, param, validationResult,
} = require('express-validator');

// Validation middleware for POST /balances/deposit/:userId
const validateDepositBalance = [
  param('userId').isInt().withMessage('User ID must be an integer'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

module.exports = {
  validateDepositBalance,
};
