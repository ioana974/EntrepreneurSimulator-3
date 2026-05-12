const mongoose = require('mongoose');

const CourseEnrollmentSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthYear: { type: String, required: true },
  city: { type: String, required: true },
  county: { type: String, required: true },
  enrollmentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CourseEnrollment', CourseEnrollmentSchema);
