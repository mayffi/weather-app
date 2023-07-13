import "../carousel.css";
import { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import config from "../config";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import {
  WiDirectionDown,
  WiDirectionUp,
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import { IoEyeSharp } from "react-icons/io5";

const Carousel = ({ data }) => {
  const weather = data.weather[0];
  const sys = data.sys;

  const iconsUrl = useMemo(
    () =>
      weather ? `https://openweathermap.org/img/wn/${weather.icon}.png` : null,
    [weather]
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1000,
  };

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Slider {...settings}>
        <div className="slick-slide carousel-content">
          <h5 className="results-name">
            {data.name}, {sys.country}
          </h5>
          <p className="temperature"> {Math.round(data.main.temp)}&deg;</p>
          <section className="icon-desc">
            <img src={iconsUrl} alt="weather icon"></img>
            <p> {weather.description}</p>
          </section>
        </div>

        {config.showSecondSlide && (
          <div className="carousel-content-two ">
            <div className="top-row">
              <p>
                <FaTemperatureHigh className="icon-style-2nd-slide m-icons" />
                <WiDirectionUp
                  className="arrow-icons"
                  style={{
                    fontSize: 20,
                    position: "relative",
                    top: 4,
                    right: 5,
                    color: "#000",
                  }}
                />
                Max
                <span className="temps">
                  {Math.round(data.main.temp_max)}&deg;
                </span>
              </p>
              {config.showFeelsLike && (
                <p>
                  <FaTemperatureHigh
                    className="icon-style-2nd-slide m-icons"
                    style={{ marginRight: "10px" }}
                  />
                  Feels like
                  <span className="temps">
                    {Math.round(data.main.feels_like)}&deg;
                  </span>
                </p>
              )}
            </div>

            <div className="bottom-row">
              <p>
                <FaTemperatureLow className="icon-style-2nd-slide m-icons" />
                <WiDirectionDown
                  className="arrow-icons"
                  style={{
                    fontSize: 32,
                    position: "relative",
                    top: 8,
                    right: 10,
                    marginTop: -20,
                    marginRight: -13,
                    color: "#000",
                  }}
                />
                Min
                <span className="temps">
                  {Math.round(data.main.temp_min)}&deg;
                </span>
              </p>
              {config.showHumidity && (
                <p>
                  <WiHumidity
                    className="icon-style m-icons"
                    style={{ marginRight: "10px" }}
                  />
                  Humidity
                  <span className="temps">
                    {Math.round(data.main.humidity)} %
                  </span>
                </p>
              )}
            </div>
          </div>
        )}

        {config.showThirdSlide && (
          <div className="slick-slide carousel-content-three">
            <div className="top-row">
              <p>
                <WiSunrise className="icon-style m-icons" /> Sunrise
                <span className="temps">{sunrise}</span>
              </p>
              {config.ShowVisibility && (
                <p>
                  <IoEyeSharp
                    className="icon-style m-icons"
                    style={{
                      fontSize: 22,
                      color: "#000",
                      marginRight: "8",
                      marginLeft: "8",
                      position: "relative",
                      right: "10",
                    }}
                  />
                  Visibility
                  <span className="temps"> {data.visibility / 1000} km</span>
                </p>
              )}
            </div>
            <div className="bottom-row">
              <p>
                <WiSunset className="icon-style m-icons" /> Sunset
                <span className="temps">{sunset}</span>
              </p>
              {config.showWindSpeed && (
                <p>
                  <WiStrongWind
                    className="icon-style m-icons"
                    style={{ marginRight: "8", marginLeft: "8" }}
                  />
                  Wind speed
                  <span className="temps">
                    {Math.round(data.wind.speed)} m/s
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
      </Slider>
    </>
  );
};

export default Carousel;
