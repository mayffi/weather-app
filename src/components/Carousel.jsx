import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import "../carousel.css";

const Carousel = (props) => {
  const weather = props.data;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 1000,
    nextArrow: (
      <div>
        <div className="left-arrow"> </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className="right-arrow"> </div>
      </div>
    ),
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

  return (
    <>
      <Slider {...settings}>
        <div className="carousel-content">
          <h5 className="results-name">
            {weather.name},{weather.sys.country}
          </h5>
          <p className="temperature"> {Math.round(weather.main.temp)}&deg;</p>
          <div className="icon-desc">
            <img src={props.iconsUrl} alt="weather icon"></img>
            <p> {weather.weather[0].description}</p>
          </div>
        </div>

        <div className="carousel-content-two">
          <div className="carousel-upper">
            <p className="max left-side">
              {" "}
              Max: {Math.round(weather.main.temp_max)}&deg;
            </p>
            <p className="min right side ">
              {" "}
              Min: {Math.round(weather.main.temp_min)}&deg;
            </p>
            <p className="feel lef- side">
              {" "}
              Feels like:{Math.round(weather.main.feels_like)}&deg;
            </p>
          </div>
          <div className="carousel-mid">
            <p className="humidity right-side">
              {" "}
              Humidity: {Math.round(weather.main.humidity)} %
            </p>
            <p className="wind left-side">
              {" "}
              Wind speed: {Math.round(weather.wind.speed)} m/s
            </p>
            <p className="visib right-side">
              {" "}
              Visibility: {weather.visibility / 1000} km
            </p>
          </div>
          <div className="carousel-lower">
            <p className="sunrise left-side"> Sunrise: {sunrise} </p>
            <p className="sunset right side"> Sunset: {sunset}</p>
          </div>
        </div>
      </Slider>
    </>
  );
};

export default Carousel;
