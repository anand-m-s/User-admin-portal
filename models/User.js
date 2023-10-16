
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    password: String, // Store hashed passwords
    secret: String,
    isAdmin: { type: Boolean, default: false },
});

// Add a method to the schema to verify the provided password
userSchema.methods.authenticate = function (password) {
    // Compare the provided password with the hashed password in the database
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
