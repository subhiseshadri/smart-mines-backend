const prisma = require('../config/db');

// Get current active meet
const getMeet = async (req, res) => {
  try {
    let meet = await prisma.weeklyMeet.findFirst();
    if (!meet) {
      meet = await prisma.weeklyMeet.create({
        data: {
          meetUrl: '',
          scheduledAt: 'Not Scheduled',
          agenda: 'Weekly Project Review & Presentation'
        }
      });
    }
    res.json(meet);
  } catch (error) {
    console.error('Fetch meet error:', error);
    res.status(500).json({ error: 'Failed to fetch meet info' });
  }
};

// Admin updates the link, timing, and agenda
const updateMeet = async (req, res) => {
  try {
    const { meetUrl, scheduledAt, agenda } = req.body;
    let meet = await prisma.weeklyMeet.findFirst();
    
    if (meet) {
      meet = await prisma.weeklyMeet.update({
        where: { id: meet.id },
        data: { meetUrl, scheduledAt, agenda }
      });
    } else {
      meet = await prisma.weeklyMeet.create({
        data: { meetUrl, scheduledAt, agenda }
      });
    }
    res.json(meet);
  } catch (error) {
    console.error('Update meet error:', error);
    res.status(500).json({ error: 'Failed to update meet info' });
  }
};

module.exports = { getMeet, updateMeet };