const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });
const projectController = require('../controllers/projectController');

router.get('/dashboard', projectController.getAdminDashboard);
router.post('/projects', upload.array('images', 4), projectController.createProject);

module.exports = router;