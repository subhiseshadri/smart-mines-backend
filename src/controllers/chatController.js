const prisma = require('../config/db');

const getMessages = async (req, res) => {
  try {
    const messages = await prisma.chatMessage.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.json(messages);
  } catch (error) {
    console.error('Fetch chat messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
};

const saveMessage = async (req, res) => {
  try {
    const { sender, text } = req.body;
    const newMessage = await prisma.chatMessage.create({
      data: { sender, text }
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Save chat message error:', error);
    res.status(500).json({ error: 'Failed to save message.' });
  }
};

module.exports = { getMessages, saveMessage };