import images from "./images.json"



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
   
 