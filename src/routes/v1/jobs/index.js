const express = require('express');

const router = express.Router();
const jobsController = require('@controllers/jobs');
const { getUnpaidJobsService, payForJobService } = require('@services/jobs');
// GET /jobs/unpaid
router.get('/unpaid', (res, req, next) => {
  jobsController.getUnpaidJobs(res, req, next, getUnpaidJobsService);
});

// POST /jobs/:job_id/pay
router.post('/:job_id/pay', (res, req, next) => {
  jobsController.payForJob(res, req, next, payForJobService);
});

module.exports = router;
