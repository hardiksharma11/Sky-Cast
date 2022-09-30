const express = require("express");
const https = require("https");
const app = express();
const city="Jabalpur";
const apiId="d3d7e7b62558f3717345c1b7cd1f8ee0";

const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}&units=metric`;

app.get("/", (req, res) => {
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data",(data)=>{
            const weatherData=JSON.parse(data);
            console.log(weatherData);
        });
    });

    res.send("Hiii");
});

app.listen(3000, () => {
    console.log("Server running on port 3000.......");
});
