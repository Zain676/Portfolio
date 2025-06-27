const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const pageController = require('../controllers/pageController'); // ✅ Import added

// Main routes
router.get('/', projectController.getHome);
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:slug', projectController.getProjectDetail);

// Static pages
router.get('/about', pageController.getAbout);
router.get('/experience', pageController.getExperience);
router.get('/education', pageController.getEducation);
router.get('/gallery', pageController.getGallery);
router.get('/contact', pageController.getContact);

module.exports = router;
