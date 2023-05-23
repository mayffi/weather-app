import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import "./App.css";
import clearsky from "./assets/clearsky-pixabay.jpg";
import cloudyday from "./assets/cloudy-pixabay.jpg";
import rainyday from "./assets/rainy.jpeg";
import snowy from "./assets/rainy.jpeg";
import sunny from "./assets/rainy.jpeg";

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [backgroundImg, setbackgroundImg] = useState(`${clearsky}`);

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=a6325784400e2a1842ec60f14b587c3b`;

  useEffect(() => {
    if (!query) return; //does nothing when there is no query
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [query, unit]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const background = () => {
    if (
      data.weather.main === "Rain" ||
      data.weather.description.includes("rain")
    ) {
      setbackgroundImg(`${rainyday}`);
    } else if (
      data.weather.main === "Clouds" ||
      data.weather.description.includes("cloudy")
    ) {
      setbackgroundImg(`${cloudyday}`);
    } else if (
      data.weather.main === "Sunny" ||
      data.weather.description.includes("sunny")
    ) {
      setbackgroundImg(`${sunny}`);
    } else if (
      data.weather.main === "Snow" ||
      data.weather.description.includes("Snow")
    ) {
      setbackgroundImg(`${snowy}`);
    } else if (
      data.weather.main === "clear" ||
      data.weather.description.includes("clear")
    ) {
      setbackgroundImg(`${clearsky}`);
    }

    return background();
  };

  const containerStyle = {
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="container" style={containerStyle}>
      <Search onSearch={setQuery} />
      {data && (
        <div>
          <div className="results">{data.main.temp}&deg;</div>
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
    </div>
  );
}

export default App;
