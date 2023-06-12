const balanceService = require('@services/balances');

async function depositToClient(req, res, next) {
  const { userId } = req.params;
  const { amount } = req.body;

  try {
    const depositPromise = balanceService.depositToClient(userId, amount);
    const result = await depositPromise;

    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  depositToClient,
};
