//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
// const md5 = require("md5")
const bcrypt = require("bcrypt");

dotenv.config();

const saltRounds = 10;
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
// userSchema.plugin(encrpt, { secret: process.env.SECERT_KEY, encryptedFields: ['password'] });


// model
const User = new mongoose.model('User', userSchema);

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
    // console.log(req.body);
    bcrypt.hash(process.env.MYPLAINTEXT, saltRounds, function(err, hash) {
        // Store hash in your password DB.
    try{  
    const newUser = new User({
        email: req.body.username,
        password:hash,
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
    if(err) console.log(err);
    }catch(err){
        console.log(err);
    }

});
});
app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne
    ({email
    : username}, function(err, foundUser) { 
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
               // decrypt
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    // result == true
                    if(result == true){
                        res.render("secrets");
                    }else{
                       //err
                       console.log(err);

                    }
                }
                );
            }
        }
    });
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
    }
);

