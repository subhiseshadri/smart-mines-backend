const express = require('express');
const router = express.Router();
const { getRepos, createRepo } = require('../controllers/githubController');

router.get('/', getRepos);
router.post('/', createRepo);

module.exports = router;