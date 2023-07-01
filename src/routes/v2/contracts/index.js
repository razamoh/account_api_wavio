const express = require('express');

const router = express.Router();
const contractController = require('@controllers/contract');
const { getContractService, getContractsService } = require('@services/contracts');
const { validateGetContractById, validateGetContracts } = require('@validations/contractValidation');

// GET /contracts/:id
router.get('/:id', validateGetContractById, contractController.getContractById(getContractService));

// GET /contracts
router.get('/', validateGetContracts, contractController.getContracts(getContractsService));

module.exports = router;
