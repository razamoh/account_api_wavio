const {
  param, body, query, validationResult,
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

// Validation middleware for GET /admin/best-profession
const validateBestProfession = [
  query('start').isISO8601().withMessage('Invalid start date'),
  query('end').isISO8601().withMessage('Invalid end date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

// Validation middleware for GET /admin/best-clients
const validateBestClients = [
  query('start').isISO8601().withMessage('Invalid start date'),
  query('end').isISO8601().withMessage('Invalid end date'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
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
  validateBestProfession,
  validateBestClients,
};
