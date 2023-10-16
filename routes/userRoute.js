const express = require('express');
const authController = require('../controllers/authController');
const User = require('../models/user');
const router = express.Router();

router.get("/", redirectToHomeIfAuthenticated, (req, res) => {
    res.render("home",{title:"user"});
});

router.get("/login", redirectToHomeIfAuthenticated, (req, res) => {
    res.render("login",{title:"user"});
});

router.get("/register", redirectToHomeIfAuthenticated, (req, res) => {
    res.render("register",{title:"user"});
});

router.get("/secrets", ensureAuthenticated, (req, res) => {
    if(req.session.isAdmin){
        res.redirect("/admin/admindashboard"); // Redirect admin users to the admin dashboard
    }
    User.find({ secret: { $ne: null } })
        .then((foundUser) => {
            if (foundUser.length > 0) {
                res.render("secrets", { usersWithSecrets: foundUser });
            } else {
                console.log(foundUser);
                res.render("secrets", { usersWithSecrets: [] });
            }
        })
        .catch((err) => {
            console.error(err);
        });
});

router.get("/submit", disableCache, (req, res) => {
    if (req.session.userId) {
        res.render('submit',{title:"user"});
    } else {
        res.redirect("/login");
    }
});

router.post("/submit", (req, res) => {
    const submittedSecret = req.body.secret;
    User.findById(req.session.userId)
        .then((foundUser) => {
            if (foundUser) {
                foundUser.secret = submittedSecret;
                return foundUser.save();
            }
        })
        .then(() => {
            res.redirect("/secrets");
        })
        .catch((err) => {
            console.error(err);
        });
});

function redirectToHomeIfAuthenticated(req, res, next) {
    if (req.session.userId) {
        return res.redirect('/secrets');
    }
    next();
}

function ensureAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect("/login");
}

function disableCache(req, res, next) {
    res.setHeader('Cache-Control', 'no-store');
    next();
}

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
