// GET /jobs/unpaid
const getUnpaidJobs = (getUnpaidJobsService) => async (req, res, next) => {
  try {
    const models = req.app.get('models');
    const unpaidJobsPromise = getUnpaidJobsService(models);
    const unpaidJobs = await unpaidJobsPromise;

    res.json(unpaidJobs);
  } catch (error) {
    next(error);
  }
};

const payForJob = (payForJobService) => async (req, res, next) => {
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
};

module.exports = {
  payForJob,
  getUnpaidJobs,
};
