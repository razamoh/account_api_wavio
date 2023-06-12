// routes/v1/balances.js

const express = require('express');

const router = express.Router();
const balanceController = require('@controllers/balances');
const { validateDepositBalance } = require('@validations');
const balanceService = require('@services/balances');
// POST /balances/deposit/:userId
router.post('/deposit/:userId', validateDepositBalance, balanceController.depositToClient(balanceService));

module.exports = router;
