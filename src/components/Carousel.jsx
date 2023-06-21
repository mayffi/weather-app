import "../carousel.css";
import { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import config from "../config";
import { FaEye, FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import {
  WiDirectionDown,
  WiDirectionUp,
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import {IoEyeSharp} from "react-icons/io5"

const Carousel = (props) => {
  const weather = props.data;

  const iconsUrl = useMemo(
    () =>
      weather
        ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
        : null,
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

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  console.log(config.showWindSpeed);

  return (
    <>
      <Slider {...settings}>
        <div className="slick-slide carousel-content">
          <h5 className="results-name">
            {weather.name},{weather.sys.country}
          </h5>
          <p className="temperature"> {Math.round(weather.main.temp)}&deg;</p>
          <section className="icon-desc">
            <img src={iconsUrl} alt="weather icon"></img>
            <p> {weather.weather[0].description}</p>
          </section>
        </div>

        {config.showSecondSlide && (
          <div className="carousel-content-two ">
            <div className="top-row">
              <p>
                <FaTemperatureHigh className="icon-style-2nd-slide" />
                <WiDirectionUp
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
                  {Math.round(weather.main.temp_max)}&deg;
                </span>
              </p>
              <p>
                <FaTemperatureHigh
                  className="icon-style-2nd-slide"
                  style={{ marginRight: "10px" }}
                />
                Feels like
                <span className="temps">
                  {Math.round(weather.main.feels_like)}&deg;
                </span>
              </p>
            </div>

            <div className="bottom-row">
              <p>
                <FaTemperatureLow className="icon-style-2nd-slide" />
                <WiDirectionDown
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
                  {Math.round(weather.main.temp_min)}&deg;
                </span>
              </p>
              <p>
                <WiHumidity
                  className="icon-style"
                  style={{ marginRight: "10px" }}
                />
                Humidity
                <span className="temps">
                  {Math.round(weather.main.humidity)} %
                </span>
              </p>
            </div>
          </div>
        )}

        {config.showThirdSlide && (
          <div className="slick-slide carousel-content-three">
            <div className="top-row">
              <p>
                <WiSunrise className="icon-style" /> Sunrise
                <span className="temps">{sunrise}</span>
              </p>
              {config.ShowVisibility && (
                <p>
                  <IoEyeSharp style={{ fontSize: 22, color: "#000", marginRight:"8",marginLeft:"8" }}/>
                  {/* <FaEye style={{ fontSize: 22, color: "#000", marginRight:"8", marginBottom:"2" }} /> */}
                  Visibility
                  <span className="temps"> {weather.visibility / 1000} km</span>
                </p>
              )}
            </div>
            <div className="bottom-row">
              <p>
                <WiSunset className="icon-style" /> Sunset
                <span className="temps">{sunset}</span>
              </p>
              {config.showWindSpeed && (
                <p>
                  <WiStrongWind className="icon-style" style={{ marginRight:"8" , marginLeft:"8"}}/>
                  Wind speed
                  <span className="temps">
                    {Math.round(weather.wind.speed)} m/s
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
