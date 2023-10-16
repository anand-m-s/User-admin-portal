
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user'); // Import the User model


const app = express();

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });

app.use('/', require('./routes/userRoute'));
app.use('/admin',require('./routes/adminRoute'));



app.listen(3000, function () {
    console.log("Server running on port 3000");
});
