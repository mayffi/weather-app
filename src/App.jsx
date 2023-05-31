import React, { useCallback, useEffect, useState } from "react";
import Search from "./components/Search";
import "./App.css";
import clearsky from "./assets/clearsky-pixabay.jpg";
import cloudyday from "./assets/cloudy-pixabay.jpg";
import rainyday from "./assets/rainy-rahul-pandit-2816625.jpg";
import snowy from "./assets/snow-vlad-chețan-3509410.jpg";
import sunny from "./assets/sunny-khanh-le-666839.jpg";
import defaultimg from "./assets/default-john-tekeridis-754419.jpg";
import misty from "./assets/misty-pixabay-163323.jpg";

function App() {
  const [query, setQuery] = useState("Helsinki");
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [backgroundImg, setbackgroundImg] = useState(`${defaultimg}`);
  const [error, setError] = useState("");
  const iconsUrl = data
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    : null;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=a6325784400e2a1842ec60f14b587c3b`;

  useEffect(() => {
    if (!query) {
      return; //does nothing when there is no query
    }
    fetch(apiUrl)
      .then(async (response) => {
        if (!response.ok) {
          setError("Input error: Input must be a city!");
          setData(null);
        } else {
          const data = await response.json(); // Process the response if successful
          console.log(data);
          setData(data); //Handles the data
        }
      })
      .catch((error) => {
        // Handle any errors
        setError("Something went wrong");
        setData(null);
      });
  }, [apiUrl, query, unit]);

  const getBackground = useCallback((data) => {
    const weather = data.weather[0];
    const weatherDesc = weather.main + weather.description;
    console.log(weatherDesc);
    if (weatherDesc.includes("rain")) {
      return rainyday;
    }
    if (weatherDesc.includes("cloud")) {
      return cloudyday;
    }
    if (weatherDesc.includes("sunny")) {
      return sunny;
    }
    if (weatherDesc.includes("snow")) {
      return snowy;
    }
    if (weatherDesc.includes("clear")) {
      return clearsky;
    }
    if (weatherDesc.includes("mist")) {
      return misty;
    }
  }, []);

  useEffect(() => {
    console.log(data);
    if (data) {
      const background = getBackground(data);
      console.log(background);
      setbackgroundImg(background);
    }
  }, [data, getBackground]);

  const containerStyle = {
    backgroundImage: `url(${backgroundImg})`,
  };

  return (
    <div className="container" style={containerStyle}>
      <Search onSearch={setQuery} />
      {data && (
        <div>
          <div className="results">
            <h5>
              {data.name},{data.sys.country}
            </h5>
            <p className="temperature"> {Math.round(data.main.temp)}&deg;</p>
            <p className="desc"> {data.weather[0].description}</p>
            <img
              src={iconsUrl}
              
              alt="weather icon"
            ></img>
          </div>
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
      {error && <div className="results"><p className="error-results">{error}</p></div>}
    </div>
  );
}

export default App;
