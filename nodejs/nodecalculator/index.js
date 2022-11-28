const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
// app.get('/', (req, res) => res.send('Hello World!'));

//body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => 
    res.sendFile(__dirname + '/index.html')
)
app.post('/', (req, res) => {
    console.log(req.body);  
    // console.log(req.payload)
    let a = req.body.num1;
    let b = req.body.num2;
    let result = Number(a) + Number(b);
    res.send('The result is ' + result);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
