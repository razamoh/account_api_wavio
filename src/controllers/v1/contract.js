/* eslint-disable import/no-unresolved */

// GET /contracts/:id
async function getContractById(req, res, next, getContractService) {
  const { id } = req.params;
  const { profile } = req;

  try {
    const contractPromise = getContractService(id, profile);
    const contract = await contractPromise;

    res.json(contract);
  } catch (error) {
    next(error);
  }
}

// GET /contracts
async function getContracts(req, res, next, getContractsService) {
  const { profile } = req;

  try {
    const contractsPromise = getContractsService(profile);
    const contracts = await contractsPromise;

    res.json(contracts);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContractById,
  getContracts,
};
