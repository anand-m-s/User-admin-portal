const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter.get("/" ,(req, res) => {
    if(req.session.userId)res.redirect('/admin/admindashboard');
    res.render("adminlogin",{title: "admin"});
});
adminRouter.get("/admindashboard",adminController.renderAdminDashboard, (req, res) => {});


// Handle the admin login form submission
adminRouter.post("/adminlogin", adminController.adminLogin);

// Logout route for admin
adminRouter.get('/logout', adminController.logout);

// Create routes for delete and block actions
adminRouter.get("/delete/:id", adminController.deleteUser);


// Add a route for search
adminRouter.get("/search", adminController.searchUsers);

// Create a route to handle user editing
adminRouter.get("/edit/:id", adminController.editUser);

// Create a route to handle user updates
adminRouter.post("/update/:id", adminController.updateUser);



module.exports = adminRouter;
