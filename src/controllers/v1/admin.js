// GET /admin/best-profession
const getBestProfession = (adminService) => async (req, res, next) => {
  const { start, end } = req.query;
  const models = req.app.get('models');
  try {
    const bestProfessionPromise = adminService(start, end, models);
    const bestProfession = await bestProfessionPromise ?? [];

    res.json({ bestProfession });
  } catch (error) {
    next(error);
  }
};

// GET /admin/best-clients
const getBestClients = (adminService) => async (req, res, next) => {
  const models = req.app.get('models');
  const { start, end, limit = 2 } = req.query;

  try {
    const bestClientsPromise = adminService(start, end, models, limit);
    const bestClients = await bestClientsPromise;

    res.json(bestClients);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBestProfession,
  getBestClients,
};
