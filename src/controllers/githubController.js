const prisma = require('../config/db');

const getRepos = async (req, res) => {
  try {
    const repos = await prisma.githubRepo.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub repositories.' });
  }
};

const createRepo = async (req, res) => {
  try {
    const { name, description, url, teamMember } = req.body;
    const repo = await prisma.githubRepo.create({
      data: { name, description, url, teamMember: teamMember || 'Team' }
    });
    res.status(201).json(repo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add GitHub repository.' });
  }
};

module.exports = { getRepos, createRepo };