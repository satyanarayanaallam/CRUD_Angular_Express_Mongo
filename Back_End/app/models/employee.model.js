const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);