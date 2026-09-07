const prisma = require('../config/db');

const getFiles = async (req, res) => {
  try {
    const files = await prisma.projectFile.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(files);
  } catch (error) {
    console.error('Fetch files error:', error);
    res.status(500).json({ error: 'Failed to fetch files.' });
  }
};

const getFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await prisma.projectFile.findUnique({ where: { id } });
    if (!file || !file.fileData) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    res.setHeader('Content-Type', file.fileType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    res.send(Buffer.from(file.fileData));
  } catch (error) {
    console.error('Download file error:', error);
    res.status(500).json({ error: 'Failed to download file.' });
  }
};

const uploadFile = async (req, res) => {
  try {
    const { name, size, uploadedBy, fileType, fileData } = req.body;
    const newFile = await prisma.projectFile.create({
      data: {
        name: name || 'Document.pdf',
        size: size || '1.0 MB',
        fileType: fileType || 'application/pdf',
        fileData: fileData ? Buffer.from(fileData, 'base64') : null,
        uploadedBy: uploadedBy || 'Student'
      }
    });
    res.status(201).json(newFile);
  } catch (error) {
    console.error('Upload file error:', error);
    res.status(500).json({ error: 'Failed to upload file.' });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.projectFile.delete({ where: { id } });
    res.json({ message: 'File deleted successfully.' });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Failed to delete file from cloud database.' });
  }
};

module.exports = { getFiles, getFileById, uploadFile, deleteFile };