const resolve = require('dotenv').config({path:".env"})
const express = require("express");
const { fetchWeatherData } = require("./weatherAPI");
const citiesAPI = require("./citiesAPI");


if (resolve.error){
throw resolve.error
}
console.log(resolve)
const app = express();
var cors = require("cors");
const PORT = 3001;

app.use(cors());
app.get("/weather", fetchWeatherData);
app.use("/cities", citiesAPI);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
