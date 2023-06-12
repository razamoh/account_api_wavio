// GET /jobs/unpaid
async function getUnpaidJobs(req, res, next, getUnpaidJobsService) {
  try {
    const models = req.app.get('models');
    const unpaidJobsPromise = getUnpaidJobsService(models);
    const unpaidJobs = await unpaidJobsPromise;

    res.json(unpaidJobs);
  } catch (error) {
    next(error);
  }
}

async function payForJob(req, res, next, payForJobService) {
  try {
  // eslint-disable-next-line camelcase
    const { job_id } = req.params;
    const { profile } = req;
    const models = req.app.get('models');

    const payForJobPromise = payForJobService(job_id, profile.id, models);
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
