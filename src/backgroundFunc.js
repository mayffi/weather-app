import clearsky from "./assets/clearsky-pixabay.jpg";
import cloudyday from "./assets/cloudy-pixabay.jpg";
import rainyday from "./assets/rainy-rahul-pandit-2816625.jpg";
import snowy from "./assets/snow-vlad-chețan-3509410.jpg";
import sunny from "./assets/sunny-khanh-le-666839.jpg";
import misty from "./assets/misty-pixabay-163323.jpg";

export const getBackground = (data) => {
    const weather = data.weather[0];
    const weatherDesc = weather.description;
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
  }