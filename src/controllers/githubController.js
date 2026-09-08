const prisma = require('../config/db');

const getRepos = async (req, res) => {
  try {
    const repos = await prisma.GitHubRepo.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(repos);
  } catch (error) {
    console.error("Get Repos Error:", error.message);
    res.status(500).json({ error: 'Failed to fetch GitHub repositories.' });
  }
};

const createRepo = async (req, res) => {
  try {
    const { repoName, description, repoUrl, assignedModule } = req.body;
    const repo = await prisma.GitHubRepo.create({
      data: { 
        repoName, 
        description, 
        repoUrl, 
        assignedModule: assignedModule || 'General' 
      }
    });
    res.status(201).json(repo);
  } catch (error) {
    console.error("Create Repo Error:", error.message);
    res.status(500).json({ error: 'Failed to add GitHub repository.' });
  }
};

module.exports = { getRepos, createRepo };