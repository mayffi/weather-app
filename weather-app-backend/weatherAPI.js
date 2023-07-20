//API file to handle the request to Openweather API
const axios = require("axios");

const API_KEY = "a6325784400e2a1842ec60f14b587c3b";

const fetchWeatherData = async (req, res) => {
  try {
    const { city, lat, lon, units } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : ''}&lat=${lat ? lat : ""}&lon=${lon ? lon : ""}&units=${units}&appid=${API_KEY}`
    );
    console.log(response);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch weather data", message:error});
  }
};
module.exports = { fetchWeatherData };
