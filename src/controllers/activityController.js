const prisma = require('../config/db');

const getLogs = async (req, res) => {
  try {
    const logs = await prisma.activityLog.findMany({ orderBy: { createdAt: 'desc' }, take: 10 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs.' });
  }
};

const createLog = async (req, res) => {
  try {
    const { action, username } = req.body;
    const log = await prisma.activityLog.create({ data: { action, username } });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create log.' });
  }
};

module.exports = { getLogs, createLog };