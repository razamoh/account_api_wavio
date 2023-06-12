const express = require('express');

const router = express.Router();
const adminController = require('@controllers/admin');
const { validateBestProfession, validateBestClients } = require('@validations');
// GET /admin/best-profession?start=<date>&end=<date>
router.get('/best-profession', validateBestProfession, adminController.getBestProfession);

// GET /admin/best-clients?start=<date>&end=<date>&limit=<integer>
router.get('/best-clients', validateBestClients, adminController.getBestClients);

module.exports = router;
