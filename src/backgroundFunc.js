import images from "./images.json"
// import clearskyday from "./assets/clearsky-day-pixabay.jpg"
// import clearskynight from "./assets/clearsky-night-jinen-shah.jpg"
// import cloudyday from "./assets/cloudy-day-goxy-bgd.jpg"
// import cloudynight from "./assets/cloudy-night-pure-julia.jpg"
// import mistyday from "./assets/misty-day-pixabay-163323.jpg"
// import mistynight from "./assets/misty-night-christina-victoria-craft.jpg"
// import rainyday from "./assets/rainy-day-jay-shah.jpg"
// import rainynight from "./assets/rainy_night-hide-obara.jpg"
// import snowyday from "./assets/snowy-day-cloris-ying.jpg"
// import snowynight from "./assets/snowy-night-presentsquare.jpg"
// import defaultImage from "./assets/default-john-tekeridis-754419.jpg"


export const getBackground = (weatherData) => {
    
   const defaultImage= "/assets/default-john-tekeridis-754419.jpg"
  
   try{
    const weather = weatherData.weather[0];
    console.log(weatherData)
    const weatherDescription =weather.main;
    const timeOfDay = weatherData.weather[0].icon;
    
    const matchedImage = images.filter( image => image.description === weatherDescription )
    console.log("List of images:" + matchedImage)
    let finalImage
    if(timeOfDay.endsWith("d")){
      finalImage=matchedImage[0]
      console.log(finalImage.path)
      return finalImage.path
    } else finalImage = matchedImage[1]
    console.log(finalImage)
    console.log(finalImage.path)
    return finalImage.path
    
   }catch(error){
    console.error("WeatherDescription or timeofDay icon not found.", error);
    return`${defaultImage}`
   }
  }
   
  // const weatherDescription = weatherData.weather[0].description;
  // const timeOfDay = weatherData.weather[0].icon;
  // if (weatherDescription.includes("clear") && timeOfDay.endsWith("d")) {
  //   return clearskyday;
  // }
  // if (weatherDescription.includes("clear") && timeOfDay.endsWith("n")) {
  //   return clearskynight;
  // }
  // if (weatherDescription.includes("clouds") && timeOfDay.endsWith("d")) {
  //   return cloudyday;
  // }
  // if (weatherDescription.includes("clouds") && timeOfDay.endsWith("n")) {
  //   return cloudynight;
  // }
  // if (weatherDescription.includes("mist" || "haze") && timeOfDay.endsWith("d")) {
  //   return mistyday;
  // }
  // if (weatherDescription.includes("mist" || "haze") && timeOfDay.endsWith("n")) {
  //   return mistynight;
  // }
  //   if (weatherDescription.includes("rain") && timeOfDay.endsWith("d")) {
  //     return rainyday;
  //   }
  //   if (weatherDescription.includes("rain") && timeOfDay.endsWith("n")) {
  //     return rainynight;
  //   }
  //   if (weatherDescription.includes("snow") && timeOfDay.endsWith("d")) {
  //     return snowyday;
  //   }
  //   if (weatherDescription.includes("snow") && timeOfDay.endsWith("n")) {
  //     return snowynight;
  //   }else{
  //     return defaultImage
  //   }
  // }

  