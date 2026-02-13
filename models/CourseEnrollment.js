const mongoose = require('mongoose');

const CourseEnrollmentSchema = new mongoose.Schema({
  userId: { type: String },
  courseId: { type: Number },
  courseName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  birthYear: { type: Number },
  city: { type: String },
  county: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CourseEnrollment', CourseEnrollmentSchema);
