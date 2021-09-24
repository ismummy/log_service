const express = require('express');
const router = express.Router();
const logger = require('../controllers/logger')

router.get('/logs', logger.getAll)

module.exports = router;
