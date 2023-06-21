
 const config ={
    showSecondSlide: process.env.REACT_APP_SHOW_SECOND_SLIDE === "true",
    showThirdSlide:  process.env.REACT_APP_SHOW_THIRD_SLIDE === "true",
    ShowVisibility: process.env.REACT_APP_SHOW_VISIBILITY === "true",
    showWindSpeed: process.env.REACT_APP_SHOW_WIND_SPEED === "true",

}
console.log(process.env.REACT_APP_SHOW_WIND_SPEED)

export default config;