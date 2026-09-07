const express = require('express');
const router = express.Router();
const { getProblems, createProblem, updateProblemStatus, deleteProblem } = require('../controllers/problemController');

router.get('/', getProblems);
router.post('/', createProblem);
router.patch('/:id/status', updateProblemStatus);
router.delete('/:id', deleteProblem);

module.exports = router;