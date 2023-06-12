const express = require('express');

const router = express.Router();
const contractController = require('@controllers/contract');
const { validateGetContractById, validateGetContracts } = require('@validations/contractValidation');

// GET /contracts/:id
router.get('/:id', validateGetContractById, contractController.getContractById);

// GET /contracts
router.get('/', validateGetContracts, contractController.getContracts);

module.exports = router;
