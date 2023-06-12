// routes/v1/balances.js

const express = require('express');

const router = express.Router();
const { depositToClient } = require('@controllers/balances');
const { validateDepositBalance } = require('@validations');
// POST /balances/deposit/:userId
router.post('/deposit/:userId', validateDepositBalance, depositToClient);

module.exports = router;
