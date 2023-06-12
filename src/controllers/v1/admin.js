// GET /admin/best-profession
async function getBestProfession(req, res, next, adminService) {
  const { start, end } = req.query;
  const models = req.app.get('models');
  try {
    const bestProfessionPromise = adminService(start, end, models);
    const bestProfession = await bestProfessionPromise ?? [];

    res.json({ bestProfession });
  } catch (error) {
    next(error);
  }
}

// GET /admin/best-clients
async function getBestClients(req, res, next, adminService) {
  const models = req.app.get('models');
  const { start, end, limit = 2 } = req.query;

  try {
    const bestClientsPromise = adminService(start, end, models, limit);
    const bestClients = await bestClientsPromise;

    res.json(bestClients);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBestProfession,
  getBestClients,
};
