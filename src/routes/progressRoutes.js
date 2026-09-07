const express = require('express');
const router = express.Router();
const { getProgress, createModule, updateModule, deleteModule } = require('../controllers/progressController');

router.get('/', getProgress);
router.post('/', createModule);
router.patch('/:id', updateModule);
router.delete('/:id', deleteModule);

module.exports = router;