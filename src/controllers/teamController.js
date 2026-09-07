const prisma = require('../config/db');

const getTeamMembers = async (req, res) => {
  try {
    const members = await prisma.teamInfo.findMany();
    res.json(members);
  } catch (error) {
    console.error('Fetch team members error:', error);
    res.status(500).json({ error: 'Failed to fetch team members.' });
  }
};

const createTeamMember = async (req, res) => {
  try {
    const { title, description, memberRole } = req.body;
    const newMember = await prisma.teamInfo.create({
      data: {
        title: title || 'Team Member',
        description: description || 'Developer',
        memberRole: memberRole || 'STUDENT'
      }
    });
    res.status(201).json(newMember);
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({ error: 'Failed to add team member.' });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, memberRole } = req.body;
    const updated = await prisma.teamInfo.update({
      where: { id },
      data: { title, description, memberRole }
    });
    res.json(updated);
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ error: 'Failed to update team member.' });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.teamInfo.delete({ where: { id } });
    res.json({ message: 'Team member removed successfully.' });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({ error: 'Failed to remove team member.' });
  }
};

module.exports = { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember };