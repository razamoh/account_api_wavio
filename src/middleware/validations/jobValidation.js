const { param, validationResult } = require('express-validator');

// Validation middleware for GET /jobs/unpaid
const validateGetUnpaidJobs = [];

// Validation middleware for POST /jobs/:job_id/pay
const validatePayJob = [
  param('job_id').isInt().withMessage('Job ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

module.exports = {
  validateGetUnpaidJobs,
  validatePayJob,
};
