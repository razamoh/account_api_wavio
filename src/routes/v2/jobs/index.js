const express = require('express');

const router = express.Router();
const jobsController = require('@controllers/jobs');
const { validateGetUnpaidJobs, validatePayJob } = require('@validations');
const { getUnpaidJobsService, payForJobService } = require('@services/jobs');
// GET /jobs/unpaid
router.get('/unpaid', validateGetUnpaidJobs, jobsController.getUnpaidJobs(getUnpaidJobsService));

// POST /jobs/:job_id/pay
router.post('/:job_id/pay', validatePayJob, jobsController.payForJob(payForJobService));

module.exports = router;
