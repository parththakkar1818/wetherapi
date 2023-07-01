const express= require("express");
const https= require("https");
const bodyParser=require("body-parser");


const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");

})

app.post("/",function(req,res){

    const query=req.body.city;
    console.log(query);
    const apikey="b7166e5ec3f3434fbdea476fdb4cc144";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const location=weatherData.name;
            const icon=weatherData.weather[0].icon;
            const iconurl="https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<p>Weather is currently: "+desc+"<p>");
            res.write("<h1>Temperature of "+location+": "+temp+" degree celcius</h1>");
            res.write("<img src="+iconurl+">");
            res.send();
        })
    })
})

app.listen(3000, function(req,res){
    console.log("server started at 3000");
})