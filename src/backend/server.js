const express = require("express");
const { fetchWeatherData } = require("./weatherAPI");

const app = express();
var cors = require("cors");
const PORT = 3001;

app.use(cors());
app.get("/weather", fetchWeatherData);
//app.get("/cities", fetchWeatherData);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});