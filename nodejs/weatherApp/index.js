const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')


const app = express()

app.use(bodyParser.urlencoded({extended: true}));


app.post("/weather",function(request, response){
    console.log(request.body)
    let url =  'https://api.openweathermap.org/data/2.5/weather?q='+ request.body.city +'&appid=f2b2646e4f58b4f41f8cf332cda829bb'
    console.log(url)
    https.get(url,(res)=>{
    console.log(res.statusCode)
    res.on("data",function(data){
        console.log(data)
        const weather = JSON.parse(data)
        console.log(weather)
        const temp = weather?.main?.temp
        console.log(temp)
        const description = weather?.weather[0]?.description
        console.log(description)
        const icon = weather?.weather[0]?.icon
        console.log(icon)
        // response.write("<img src=''  alt ='icon weather' />")
        const imgUrl = "https://openweathermap.org/img/wn/" + icon+ "@2x.png"
        response.write("<h1> The temperature in London is " + temp +" degrees Celcius </h1>")
        response.write("<p>The description of the weather " + description + "</p>")
        response.write("<img src=" + imgUrl +">")
        response.send()
    })
    })
})

app.get('/weather', (req,res)=>{

    res.sendFile(__dirname+"/index.html")

})


app.listen(8000,function(){
    console.log("Server is running on port 8000.")
})