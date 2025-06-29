const Contact = require("../models/contact");

module.exports.getAbout = (req, res) => {
  res.render("pages/about", { title: "About" });
};

module.exports.getExperience = (req, res) => {
  res.render("pages/experience", { title: "Experience" });
};

module.exports.getEducation = (req, res) => {
  res.render("pages/education", { title: "Education" });
};

module.exports.getGallery = (req, res) => {
  res.render("pages/gallery", { title: "Gallery" });
};

module.exports.getContact = (req, res) => {
  res.render("pages/contact", {
    title: "Contact",
    success: req.flash("success"),
  });
};

module.exports.handleContactForm = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await Contact.create({ name, email, message });
    req.flash("success", "Your message has been sent successfully!");
    res.redirect("/contact");
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/500", { title: "Error" });
  }
};
