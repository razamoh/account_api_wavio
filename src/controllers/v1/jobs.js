const { getUnpaidJobsService, payForJobService } = require('@services/jobs');

// GET /jobs/unpaid
async function getUnpaidJobs(req, res, next) {
  try {
    const unpaidJobsPromise = getUnpaidJobsService();
    const unpaidJobs = await unpaidJobsPromise;

    res.json(unpaidJobs);
  } catch (error) {
    next(error);
  }
}

async function payForJob(req, res, next) {
  // eslint-disable-next-line camelcase
  const { job_id } = req.params;
  const { profile } = req;

  try {
    const payForJobPromise = payForJobService(job_id, profile.id);
    const result = await payForJobPromise;
    res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  payForJob,
  getUnpaidJobs,
};
