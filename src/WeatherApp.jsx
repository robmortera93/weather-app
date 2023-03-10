import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [weather, setWeather] = useState({});
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const icon = `https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`;

  const apiKey = "48df93cbae7704f9e7d008d9556dce08";

  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    axios
      .get(
        ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`
      )
      .then((res) => setWeather(res.data));
  };
  console.log(weather);

  const fahrenheit = (((weather.main?.temp - 273.15) * 9) / 5 + 32).toFixed(2);
  const celsius = (weather.main?.temp - 273.15).toFixed(2);
  const wind = (weather.wind?.speed * 3.6).toFixed(2);
  const date = new Date();
  const todayDate = date.toDateString();

  const changeTemp = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="card-container">
      <div className="title">
        <h1>Weather App</h1>
      </div>
      <div className="temp-icon">
        <div className="forecast item2">
          <div className="location">
            <h3>
              {" "}
              {weather.name}, {weather.sys?.country}
            </h3>
          </div>
          <div className="date">
            <p>{todayDate}</p>
          </div>

          <div className="temp">
            <p>
              {isCelsius ? celsius : fahrenheit} {isCelsius ? "°C" : "°F"}
            </p>
          </div>

          <div className="degrees">
            <button onClick={changeTemp} className="btn-temp">
              Degrees °C / °F
            </button>
          </div>
        </div>

        <div className="description">
          <img className="icon item1" src={icon} alt="" />
          <p className="item2">
            {" "}
            <em>"{weather.weather?.[0].description}"</em>{" "}
          </p>
        </div>
      </div>
      <div className="info">
        <div className="wind">
          <p>
            <i className="fa-solid fa-wind"></i> Wind Speed: {wind} km/hr
          </p>
        </div>

        <div className="clouds">
          <p>
            <i className="fa-solid fa-cloud"></i> Clouds: {weather.clouds?.all}%
          </p>
        </div>

        <div className="pressure">
          <p>
            <i className="fa-solid fa-cloud-rain"></i> Humidity:{" "}
            {weather.main?.humidity}%
          </p>
        </div>

        <div className="pressure">
          <p>
            <i className="fa-solid fa-temperature-half"></i> Pressure:{" "}
            {weather.main?.pressure} hPa
          </p>
        </div>

        <div className="getLocation">
          <button onClick={getLocation} className="btn-location">
            {" "}
            <i
              onClick={getLocation}
              className="fa-solid fa-map-location"
            ></i>{" "}
            Get current location
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
