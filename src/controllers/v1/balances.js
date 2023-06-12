const depositToClient = (balanceService) => async (req, res, next) => {
  const { userId } = req.params;
  const { amount } = req.body;
  const models = req.app.get('models');
  try {
    const depositPromise = balanceService.depositToClient(userId, amount, models);
    const result = await depositPromise;

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  depositToClient,
};
