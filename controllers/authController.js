const User = require('../models/user');
const bcrypt = require('bcrypt');

// Registration controller
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the saltRounds (10 in this case)

        // Create a new user with the hashed password
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Log in the user after registration
        req.session.userId = newUser._id;
        res.redirect("/secrets");
    } catch (err) {
        console.error(err);
        res.redirect("/register");
    }
};

// Login controller
exports.login = (req, res) => {
    const { username, password } = req.body;
    
    User.findOne({ username })
  

        .then((user) => {
            if (user && user.authenticate(password)) {
                req.session.userId = user._id;
                
                res.redirect("/secrets");
            } else {
                res.redirect("/login");
            }
        })
        .catch((err) => {
            console.error(err);
            res.redirect("/login");
        });
    
};




// Logout controller
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
};
