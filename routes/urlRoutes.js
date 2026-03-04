const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/api/shorten', urlController.shortenUrl);
router.get('/:code', urlController.redirect);

module.exports = router;
