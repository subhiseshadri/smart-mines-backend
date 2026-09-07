const prisma = require('../config/db');

const getUpdates = async (req, res) => {
  try {
    const updates = await prisma.weeklyUpdate.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(updates);
  } catch (error) {
    console.error('Fetch weekly updates error:', error);
    res.status(500).json({ error: 'Failed to fetch weekly updates.' });
  }
};

const createUpdate = async (req, res) => {
  try {
    const { completed, workingOn, blockers, nextWeek, submittedBy } = req.body;
    const newUpdate = await prisma.weeklyUpdate.create({
      data: {
        completed,
        workingOn,
        blockers: blockers || "None",
        nextWeek,
        submittedBy: submittedBy || 'Student'
      }
    });
    res.status(201).json(newUpdate);
  } catch (error) {
    console.error('Create weekly update error:', error);
    res.status(500).json({ error: 'Failed to submit weekly update.' });
  }
};

module.exports = { getUpdates, createUpdate };