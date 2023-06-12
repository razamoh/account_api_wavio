const { getBestProfessionService, getBestClientsService } = require('@services/admin');

// GET /admin/best-profession
async function getBestProfession(req, res, next) {
  const { start, end } = req.query;

  try {
    const bestProfessionPromise = getBestProfessionService(start, end);
    const bestProfession = await bestProfessionPromise ?? [];

    res.json({ bestProfession });
  } catch (error) {
    next(error);
  }
}

// GET /admin/best-clients
async function getBestClients(req, res, next) {
  const { start, end, limit = 2 } = req.query;

  try {
    const bestClientsPromise = getBestClientsService(start, end, limit);
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
