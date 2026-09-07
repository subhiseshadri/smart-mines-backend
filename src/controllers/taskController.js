const prisma = require('../config/db');

const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { assignedTo: true }
    });
    res.json(tasks);
  } catch (error) {
    console.error('Fetch tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, userId } = req.body;

    let targetUserId = userId;
    if (!targetUserId) {
      const defaultUser = await prisma.user.findFirst();
      if (!defaultUser) {
        return res.status(400).json({ error: 'No users found in database to assign task to.' });
      }
      targetUserId = defaultUser.id;
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        assignedTo: {
          connect: { id: targetUserId }
        }
      },
      include: { assignedTo: true }
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task.' });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id },
      include: { assignedTo: true }
    });
    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task status.' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Directly delete the task from the cloud database
    await prisma.task.delete({
      where: { id }
    });

    res.json({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error('Detailed Delete Task Error:', error);
    res.status(500).json({ error: error.message || 'Failed to delete task.' });
  }
};

module.exports = { getTasks, createTask, updateTaskStatus, deleteTask };