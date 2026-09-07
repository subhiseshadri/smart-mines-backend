const express = require('express');
const router = express.Router();
const { getUpdates, createUpdate } = require('../controllers/updateController');

router.get('/', getUpdates);
router.post('/', createUpdate);

module.exports = router;