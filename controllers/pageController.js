// === CONTROLLER (controllers/pageController.js) ===

exports.getAbout = (req, res) => {
  res.render('pages/about', { title: 'About' });
};

exports.getExperience = (req, res) => {
  res.render('pages/experience', { title: 'Experience' });
};

exports.getEducation = (req, res) => {
  res.render('pages/education', { title: 'Education' });
};

exports.getGallery = (req, res) => {
  res.render('pages/gallary', { title: 'Gallery' });
};

exports.getContact = (req, res) => {
  res.render('pages/contact', { title: 'Contact' });
};
