const express = require('express');
const router = express.Router();
const { getMeet, updateMeet } = require('../controllers/meetController');

router.get('/', getMeet);
router.post('/', updateMeet);

module.exports = router;