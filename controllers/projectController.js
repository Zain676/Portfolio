// === CONTROLLER (controllers/projectController.js) ===
const Project = require("../models/project");


module.exports.getHome = async (req, res) => {
  try {
    const featuredProjects = await Project.find({ isFeatured: true }).limit(3);
    res.render('pages/home', { title: 'Home', featuredProjects });
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/500', { title: 'Server Error' });
  }
};

module.exports.getAllProjects = async (req, res) => {
  try {
    const { search, tech, page = 1, limit = 6 } = req.query;
    const query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (tech) query.techStack = tech;

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(query);

    res.render('pages/projects', {
      title: 'Projects',
      projects,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      search,
      tech
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/500', { title: 'Server Error' });
  }
};

module.exports.getProjectDetail = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).render('pages/404', { title: 'Not Found' });
    res.render('pages/project-detail', { title: project.title, project });
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/500', { title: 'Server Error' });
  }
};

module.exports.getAdminDashboard = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.render('admin/dashboard', { title: 'Admin Panel', projects });
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/500', { title: 'Server Error' });
  }
};

module.exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    project.isFeatured = req.body.isFeatured === 'on';
    project.imageUrls = req.files.map(f => f.path);
    await project.save();
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/500', { title: 'Server Error' });
  }
};


module.exports.getContact = (req, res) => {
  res.render('pages/contact', { title: 'Contact' });
};

module.exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // For now, just log or simulate save
    console.log('Contact Form Submitted:', { name, email, message });

    // Show a success message (flash message or redirect with query param)
    res.redirect('/contact?success=true');
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).render('pages/500', { title: 'Server Error' });
  }
};

