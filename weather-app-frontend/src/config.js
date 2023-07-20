const config = {
  showSecondSlide: process.env.REACT_APP_SHOW_SECOND_SLIDE === "true",
  showThirdSlide: process.env.REACT_APP_SHOW_THIRD_SLIDE === "true",
  ShowVisibility: process.env.REACT_APP_SHOW_VISIBILITY === "true",
  showWindSpeed: process.env.REACT_APP_SHOW_WIND_SPEED === "true",
  showFeelsLike: process.env.REACT_APP_SHOW_FEELS_LIKE === "true",
  showHumidity: process.env.REACT_APP_SHOW_HUMIDITY === "true",
};

export default config;
