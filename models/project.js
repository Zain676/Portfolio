const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  techStack: [String],
  github: String,
  liveLink: String,
  imageUrls: [String],
  isFeatured: Boolean,
}, { timestamps: true });

projectSchema.pre('save', function(next) {
  this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  next();
});

module.exports = mongoose.model('Project', projectSchema);
