const express = require('express');

const router = express.Router();
const contractController = require('@controllers/contract');
const { getContractService, getContractsService } = require('@services/contracts');
const { validateGetContractById, validateGetContracts } = require('@validations/contractValidation');

// GET /contracts/:id
router.get('/:id', validateGetContractById, (res, req, next) => {
  contractController.getContractById(res, req, next, getContractService);
});

// GET /contracts
router.get('/', validateGetContracts, (res, req, next) => {
  contractController.getContracts(res, req, next, getContractsService);
});

module.exports = router;
