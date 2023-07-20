//API file to handle the request to cities list API

const axios = require("axios");
const express = require("express");
const fetchCities = express.Router();

const API_KEY = process.env["CITY_LIST_API_KEY"];
const API_HOST = "wft-geo-db.p.rapidapi.com";

fetchCities.get("/cities", async (req, res) => {
  const { namePrefix } = req.query;
  const options = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/places",
    params: {
      namePrefix: namePrefix,
      limit: "5",
      types: "CITY",
      sort: "-population",
    },
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST,
    },
  };
  try {
    const response = await axios.request(options);
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch cities" });
  }
});

module.exports = fetchCities;
