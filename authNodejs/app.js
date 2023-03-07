//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();
// const md5 = require("md5")
const bcrypt = require("bcrypt");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const saltRounds = 10;

app.use(
  session({
    secret: process.env.SECERT_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });
// mongoose.set("useCreateIndex", true);
// mongoose.set("strictQuery", false);
// schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  timeStamp: Date,
});
userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(encrpt, { secret: process.env.SECERT_KEY, encryptedFields: ['password'] });

// model
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
  res.render("home");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/register", function (req, res) {
  res.render("register");
});
app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});
app.get("/logout", function (req, res) {
  req.logout(req.user, function (err) {
    if (err) {
        console.log(err);
    } else {
        res.redirect("/");
        }

    });
});
app.post("/register", function (req, res) {
  User.register(
    { username: req.body.username, timeStamp: new Date().toLocaleString() },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    }
  );

  // console.log(req.body);
  //   bcrypt.hash(process.env.MYPLAINTEXT, saltRounds, function (err, hash) {
  // Store hash in your password DB.
  // try {
  //   const newUser = new User({
  //     email: req.body.username,
  //     password: hash,
  // format format  23 Jan 2020
  //         timeStamp: new Date().toLocaleString(),
  //       });
  //       newUser.save(function (err) {
  //         if (err) {
  //           console.log(err, "error");
  //         } else {
  //           console.log("success");
  //           res.render("secrets");
  //         }
  //       });
  //       if (err) console.log(err);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });

  //   const username = req.body.username;
  //   const password = req.body.password;

  //   User.findOne({ email: username }, function (err, foundUser) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       if (foundUser) {
  //         // decrypt
  //         bcrypt.compare(password, foundUser.password, function (err, result) {
  //           // result == true
  //           if (result == true) {
  //             res.render("secrets");
  //           } else {
  //             //err
  //             console.log(err);
  //           }
  //         });
  //       }
  //     }
  //   });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
