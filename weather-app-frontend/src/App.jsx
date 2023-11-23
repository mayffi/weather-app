import React, { useEffect, useState, useMemo, useCallback } from "react";
import Search from "./components/Search";
import "./App.css";
import { getBackground } from "./backgroundFunc";
import Carousel from "./components/Carousel";

function App() {
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

  const fetchWeatherData = useCallback(
    async ({ query, lat, lon, unit }) => {
      try {
        let request;
        if (query === undefined) {
          request = `http://localhost:3001/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=`;
        } else {
          request = `http://localhost:3001/weather?q=${query}&units=${unit}&appid=`;
        }

        setLoading(true);

        const response = await fetch(request);
        const data = await response.json();
console.log(data)
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
    },
    [lat, lon, unit]
  );

  useEffect(() => {
    if (!lat || !lon) {
      setError("Unable to retrieve your current location");
      return;
    }

    fetchWeatherData({ lat, lon, unit });
  }, [fetchWeatherData, lat, lon, unit]);

  useEffect(() => {
    if (data) {
      const background = getBackground(data);
      setbackgroundImg(background);
    }
  }, [data]);

  useEffect(() => {
    if (!lat || !lon) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        });
      }
    }
  }, [lat, lon]);

  const containerStyle = {
    backgroundImage: `url(${backgroundImg})`,
  };

  const setCoords = (lat, lon) => {
    setLat(lat);
    setLon(lon);
  };

  return (
    <div className="container" style={containerStyle}>
      <Search onSearch={setCoords} />
      {loading && <p className="loading"> Fetching weather information...</p>}

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
