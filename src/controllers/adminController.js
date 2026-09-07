const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

// Get all users (Admin view)
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, username: true, email: true, role: true, createdAt: true }
    });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

// Create a new user (Admin action)
const createUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    const identifier = email || username;

    const hashedPassword = await bcrypt.hash(password || 'password123', 10);
    const normalizedRole = role ? role.toUpperCase() : 'STUDENT';

    const newUser = await prisma.user.create({
      data: {
        name,
        username: identifier,
        email: identifier,
        passwordHash: hashedPassword,
        role: normalizedRole
      }
    });

    res.status(201).json({ 
      id: newUser.id, 
      name: newUser.name, 
      username: newUser.email, 
      role: newUser.role 
    });
  } catch (error) {
    console.error('Detailed Create User Error:', error);
    res.status(500).json({ error: error.message || 'Failed to create user in database.' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
};

module.exports = { getUsers, createUser, deleteUser };