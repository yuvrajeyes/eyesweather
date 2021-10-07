const express = require("express");
const request = require("request");
const router = express.Router();

require("dotenv").config();

const apiKey = process.env.API_KEY;

router.get("/", function (req, res) {
  res.render("index", { weather: null, error: null });
});

router.post("/", function (req, res) {
  let city = req.body.city;

  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render("index", { weather: null, error: "Error, please try again" });
    } else {
      let weather = JSON.parse(body);

      console.log(weather);

      if (weather.main == undefined) {
        res.render("index", {
          weather: null,
          error: "Error, please try again",
        });
      } else {
        let place = `${weather.name}, ${weather.sys.country}`,
          weatherTimezone = new Date(),
          weatherTemp = `${weather.main.temp}`,
          weatherFahrenheit = ((weatherTemp * 9) / 5 + 32).toFixed(2),
          weatherPressure = `${weather.main.pressure}`,
          weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
          wind_speed = `${weather.wind.speed}`,
          visibility = `${weather.visibility}`,
          main = `${weather.weather[0].main}`,
          weatherDescription = `${weather.weather[0].description}`,
          humidity = `${weather.main.humidity}`,
          clouds = `${weather.clouds.all}`;

        function degToDir(num) {
          var val = Math.floor(num / 22.5 + 0.5);
          var arr = [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW",
          ];
          return arr[val % 16];
        }

        let wind_direction = degToDir(weather.wind.deg);
        res.render("index", {
          weather: weather,
          place: place,
          temp: weatherTemp,
          pressure: weatherPressure,
          icon: weatherIcon,
          description: weatherDescription,
          timezone: weatherTimezone,
          humidity: humidity,
          fahrenheit: weatherFahrenheit,
          clouds: clouds,
          wind_speed: ((wind_speed * 18) / 5).toFixed(2),
          wind_direction: wind_direction,
          visibility: visibility,
          main: main,
          error: null,
        });
      }
    }
  });
});

module.exports = router;
