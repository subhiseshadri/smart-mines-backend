const prisma = require('../config/db');

const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(notifications);
  } catch (error) {
    console.error('Fetch notifications error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
};

const createNotification = async (req, res) => {
  try {
    const { title, message } = req.body;
    const newNotif = await prisma.notification.create({
      data: {
        title: title || 'System Announcement',
        message: message || 'Important update from Admin.'
      }
    });
    res.status(201).json(newNotif);
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ error: 'Failed to broadcast notification.' });
  }
};

module.exports = { getNotifications, createNotification };