// routes/v1/index.js

const express = require('express');

const router = express.Router();
const adminRouter = require('./admin');
const contractRouter = require('./contracts');
const jobsRouter = require('./jobs');
const balancesRouter = require('./balances');

// Admin Routes
router.use('/admin', adminRouter);

// Contract Routes
router.use('/contracts', contractRouter);

// Job Routes
router.use('/jobs', jobsRouter);

// Balances Routes
router.use('/balances', balancesRouter);

module.exports = router;
