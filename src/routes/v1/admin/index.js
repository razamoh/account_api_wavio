const express = require('express');

const router = express.Router();
const adminController = require('@controllers/admin');
const { validateBestProfession, validateBestClients } = require('@validations');
const { getBestProfessionService, getBestClientsService } = require('@services/admin');

// GET /admin/best-profession?start=<date>&end=<date>
router.get('/best-profession', validateBestProfession, (req, res, next) => {
  adminController.getBestProfession(req, res, next, getBestProfessionService);
});

// GET /admin/best-clients?start=<date>&end=<date>&limit=<integer>
router.get('/best-clients', validateBestClients, (req, res, next) => {
  adminController.getBestClients(req, res, next, getBestClientsService);
});

module.exports = router;
