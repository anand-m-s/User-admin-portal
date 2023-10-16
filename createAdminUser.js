// // createAdminUser.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const User = require('./models/user');

// // Connect to the MongoDB database
// mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });

// async function createAdminUser() {
//     try {
//         // Hash the admin password
//         const hashedPassword = await bcrypt.hash('owner111', 10);

//         // Create the admin user with the hashed password
//         const adminUser = new User({
//             email: 'owner@gmail.com',
//             password: hashedPassword, // Use the hashed password
//             isAdmin: true
//         });

//         // Save the admin user to the database
//         await adminUser.save();

//         console.log('Admin user created successfully');
//     } catch (error) {
//         console.error(error);
//     } finally {
//         // Close the database connection
//         mongoose.connection.close();
//     }
// }

// // Call the function to create the admin user
// createAdminUser();
