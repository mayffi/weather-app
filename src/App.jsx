import React, { useEffect, useState, useMemo, useCallback } from "react";
import Search from "./components/Search";
import "./App.css";
import defaultimg from "./assets/default-john-tekeridis-754419.jpg";
import { getBackground } from "./backgroundFunc";
import Carousel from "./components/Carousel";

function App(props) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [backgroundImg, setbackgroundImg] = useState(`${defaultimg}`);
  const [error, setError] = useState("");
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
 

  const iconsUrl = useMemo(
    () =>
      data
        ? `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        : null,
    [data]
  );

  const apiUrl = useMemo(
    () =>
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&lat=${lat}&lon=${lon}&units=${unit}&appid=a6325784400e2a1842ec60f14b587c3b`,
    [query, unit, lat, lon]
  );
     

//     }

 

  useEffect(() => {
    
    fetch(apiUrl)
      .then(async (response) => {
        if (!response.ok) {
          setError("City not found. Check your input");
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
  }, [apiUrl, query]);

  useEffect(() => {
    if (data) {
      const background = getBackground(data);
      console.log(background);
      setbackgroundImg(background);
    }
  }, [data]);

  useEffect(() => {
    if(navigator.geolocation ){
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(lat, lon)
           setLat(position.coords.latitude);
           setLon(position.coords.longitude)
         
          })
        }else{
          setError("Unable to retrieve your location")
        }
    
  }, [data, lat,lon]);

  // if(navigator.geolocation){
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLat(position.coords.latitude);
  //        setLon(position.coords.longitude)
  //        console.log(lat, lon)
  //       })
  //     }else{
  //       setError("Unable to retrieve your location")
  //     }
 


  const containerStyle = {
    backgroundImage: `url(${backgroundImg})`,
  };

  return (
    <div className="container" style={containerStyle}>
      <Search onSearch={setQuery} />
      {/* {currentLocation && !data ?( <p> Loading weather data...</p>) : null} */}
      {data && (
        <div>
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
