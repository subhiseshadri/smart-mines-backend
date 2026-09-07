const express = require('express');
const router = express.Router();
const { getFiles, getFileById, uploadFile, deleteFile } = require('../controllers/fileController');

router.get('/', getFiles);
router.get('/:id/download', getFileById);
router.post('/', uploadFile);
router.delete('/:id', deleteFile);

module.exports = router;