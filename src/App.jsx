import React, { useEffect, useState, useMemo, useCallback } from "react";
import Search from "./components/Search";
import "./App.css";
import { getBackground } from "./backgroundFunc";
import Carousel from "./components/Carousel";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [backgroundImg, setbackgroundImg] = useState(
    "/assets/default-john-tekeridis-754419.jpg"
  );
  const [error, setError] = useState("");
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [loading, setLoading] = useState(false);

  const iconsUrl = useMemo(
    () =>
      data
        ? `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        : null,
    [data]
  );

  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/weather?city=${city}&lat=${lat}&lon=${lon}&units=${unit}`
      );
      const data = await response.json();
      if (data.error) {
        setError("There is an error. Check your input");
        setData(null);
        return;
      }
      setData(data);
      setError(null);
    } catch (error) {
      setError("Something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [city, lat, lon, unit]);

  useEffect(() => {
    if (!lat || !lon) return;
    fetchWeatherData();
  }, [fetchWeatherData, lat, lon, city]);

  useEffect(() => {
    if (data) {
      const background = getBackground(data);
      console.log(background);
      setbackgroundImg(background);
    }
  }, [data]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(lat, lon);
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    } else {
      setError("Unable to retrieve your location");
    }
  }, [data, lat, lon]);

  const containerStyle = {
    backgroundImage: `url(${backgroundImg})`,
   
  };

  return (
    <div className="container" style={containerStyle}>
      <Search onSearch={setCity} />
      {loading && <p className="results">Fetching weather information</p>}

      {data && (
        <div className="content">
          <Carousel data={data} iconsUrl={iconsUrl} slides={App} />
          <div className="unit-selector">
            <span
              className={unit === "metric" ? "active" : ""}
              onClick={() => setUnit("metric")}
            >
              Metric:&deg;C
            </span>
            <span
              className={unit === "imperial" ? "active" : ""}
              onClick={() => setUnit("imperial")}
            >
              Imperial:&deg;F
            </span>
          </div>
        </div>
      )}
      {error && (
        <div
          className="results"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <p className="error-results">{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;