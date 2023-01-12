const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
console.log(process.env.MONGODBURL);
mongoose.connect(process.env.MONGODBURL,
{useNewUrlParser: false, useUnifiedTopology: false},
(err) => {
    if(err){
        console.log(err,"Error connecting to DB");
    }else{
        console.log("Connected to DB");
    }
});


const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));