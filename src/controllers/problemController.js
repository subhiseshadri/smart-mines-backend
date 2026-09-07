const prisma = require('../config/db');

const getProblems = async (req, res) => {
  try {
    const problems = await prisma.problem.findMany();
    res.json(problems);
  } catch (error) {
    console.error('Fetch problems error:', error);
    res.status(500).json({ error: 'Failed to fetch problems.' });
  }
};

const createProblem = async (req, res) => {
  try {
    const { title, description, module, submittedBy } = req.body;
    const newProblem = await prisma.problem.create({
      data: {
        title,
        description,
        module,
        submittedBy: submittedBy || 'Student',
        status: 'Open'
      }
    });
    res.status(201).json(newProblem);
  } catch (error) {
    console.error('Create problem error:', error);
    res.status(500).json({ error: 'Failed to create problem.' });
  }
};

const updateProblemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.problem.update({
      where: { id },
      data: { status: status || 'Resolved' }
    });
    res.json(updated);
  } catch (error) {
    console.error('Update problem status error:', error);
    res.status(500).json({ error: 'Failed to update problem status.' });
  }
};

const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.problem.delete({ where: { id } });
    res.json({ message: 'Problem deleted successfully.' });
  } catch (error) {
    console.error('Delete problem error:', error);
    res.status(500).json({ error: 'Failed to delete problem.' });
  }
};

module.exports = { getProblems, createProblem, updateProblemStatus, deleteProblem };