const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();
// const city="London";
const apiId="d3d7e7b62558f3717345c1b7cd1f8ee0";

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req, res) => {
    res.sendFile(__dirname+ "/index.html");
});

app.post("/",(req,res)=>{

    console.log("Post request received.");
    const city=req.body.cityName;
    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}&units=metric`;
    
    https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data",(data)=>{
        const weatherData=JSON.parse(data);
        console.log(weatherData);
        const temp=weatherData.main.temp;
        const description= weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const img=`http://openweathermap.org/img/wn/${icon}@2x.png`;
        res.write(`<h1>The Current Temperature of ${city} is ${temp}</h1>
                    <h3>The current Weather is ${description}</h3>`);
        
        res.write(`<img src="${img}" alt="${description}" >`);
        res.send();
    });
});

});




app.listen(3000, () => {
    console.log("Server running on port 3000.......");
});
