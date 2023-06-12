const express = require('express');

const router = express.Router();
const jobsController = require('@controllers/jobs');

// GET /jobs/unpaid
router.get('/unpaid', jobsController.getUnpaidJobs);

// POST /jobs/:job_id/pay
router.post('/:job_id/pay', jobsController.payForJob);

module.exports = router;
