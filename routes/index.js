const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const pageController = require('../controllers/pageController'); 

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', projectController.getHome);
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:slug', projectController.getProjectDetail);

// Static pages
router.get('/about', pageController.getAbout);
router.get('/experience', pageController.getExperience);
router.get('/education', pageController.getEducation);
router.get('/gallery', pageController.getGallery);
router.get('/contact', pageController.getContact);

// Contact Form Submission
router.post('/contact', pageController.handleContactForm);


module.exports = router;
