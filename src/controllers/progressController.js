const prisma = require('../config/db');

const getProgress = async (req, res) => {
  try {
    const modules = await prisma.projectModule.findMany({
      orderBy: { moduleName: 'asc' }
    });
    res.json(modules);
  } catch (error) {
    console.error('Fetch progress error:', error);
    res.status(500).json({ error: 'Failed to fetch progress.' });
  }
};

const createModule = async (req, res) => {
  try {
    const { moduleName, progress } = req.body;
    const newMod = await prisma.projectModule.create({
      data: {
        moduleName: moduleName || 'New Module',
        progress: progress ? parseInt(progress) : 0
      }
    });
    res.status(201).json(newMod);
  } catch (error) {
    console.error('Create module error:', error);
    res.status(500).json({ error: 'Failed to create module.' });
  }
};

const updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const { moduleName, progress } = req.body;
    const updated = await prisma.projectModule.update({
      where: { id },
      data: {
        moduleName,
        progress: progress !== undefined ? parseInt(progress) : undefined
      }
    });
    res.json(updated);
  } catch (error) {
    console.error('Update module error:', error);
    res.status(500).json({ error: 'Failed to update module.' });
  }
};

const deleteModule = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.projectModule.delete({ where: { id } });
    res.json({ message: 'Module removed successfully.' });
  } catch (error) {
    console.error('Delete module error:', error);
    res.status(500).json({ error: 'Failed to remove module.' });
  }
};

module.exports = { getProgress, createModule, updateModule, deleteModule };