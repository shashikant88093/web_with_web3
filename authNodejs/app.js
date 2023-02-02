//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,  { useNewUrlParser: true,
    useUnifiedTopology: true }) 
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });


// schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    timeStamp: Date
});
// model
const User = new mongoose.model('User', userSchema);
console.log(User,"###############");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home");
});
app.get("/login", function(req, res) {
    res.render("login");
});
app.get("/register", function(req, res) {
    res.render("register");
});
app.post("/register", function(req, res) {
    console.log(req.body);
    const newUser = new User({
        email: req.body.username,
        password: req.body.password,
        // format format  23 Jan 2020 
        timeStamp: new Date().toLocaleString()
    });
    newUser.save(function(err) {
        if (err) {
            console.log(err,"error");
        } else {
            console.log("success");
            res.render("secrets");
        }
    });
});
app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log("username,password");
    console.log(username,password);
    console.log("username,password");

    User.findOne
    ({email
    : username}, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");
                }
            }
        }
    });
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
    }
);
