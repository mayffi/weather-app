import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../dropDown.css";


function Search(props) {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);


  // const geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=10&appid=a6325784400e2a1842ec60f14b587c3b`;

  
  
  const citiesApiUrl = `https://city-and-state-search-api.p.rapidapi.com/cities/search?q=${search}&limit=5`;
  const citiesOptions =  {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '67458faf35msh80cd056b037cd02p10ab4bjsnb37bc61599c1',
      'X-RapidAPI-Host': 'city-and-state-search-api.p.rapidapi.com'
    }
  };
  


  const fetchOptions = useCallback(async () => {
    await fetch(citiesApiUrl, citiesOptions)
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, [search, citiesApiUrl]);

  useEffect(() => {
    if (search.length) {
      fetchOptions();
    } else {
      setOptions([]);
    }
  }, [fetchOptions, search.length]);

  const handleOptionsClick = (city) => {
    setSearch(city); 
    getWeather();
    setOptions([]);
    if (!getWeather){
      setOptions([]);
   
    }
  };

  const getWeather = (e = null) => {
    if (e) {
      e.preventDefault();
    }
    props.onSearch(search); //takes care of the search when a user submits, passes to the parent component through props
  };

  const clearInput = () => {
    setSearch("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value); //handles the value change when user types an input
  };

 

  return (
    <form onSubmit={getWeather} >
      <div className="search-container">
        <div className="dropdown">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Enter a city"
            onClick={clearInput}
          />
          {options.length > 0 && (
            <ul className="city-list">
              {options.map((city) => (
                <li
                  key={city.id}
                  onClick={() => handleOptionsClick(city.name)}
                >
                  {city.name} ,{city.country_name}
                </li>
              ))}
              {/* <option value=""></option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))} */}
            </ul>
          )}
          {/* {options.length > 0 && (
            <select value={{ selectedOption }} onChange={handleOption}>
              {" "}
              <option value=""></option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )} */}
        </div>

        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </div>
    </form>
  );
}

export default Search;
// const apiKey = "AIzaSyBncw8xxw1Ljfmr786dSJtvFH3wZ9FnYKE"

// const {ref} = usePlacesWidget({
//   apiKey:{apiKey},
//   placeholder:"Enter a city",
//   onPlaceSelected: (place) => {
//     const city =place.name;
//     console.log(city);
//   },
//   options: {
//     types: ["(cities)"],
//     fields: ["formatted_address"]
//   }
// });

// const loadOptions = (inputValue) => {
//    {
//     return fetch(
//       `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`,
//       geoApiOptions
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         return {
//           options: response.data.map((city) => {
//             return {
//               value: `${city.latitude} ${city.longitude}`,
//               label: `${city.name}, ${city.countryCode}`,
//             };
//           }),
//         };
//       });
//   }
// };
// const handleChange = (searchData) => {
//   setSearch(searchData);
//   onSearch(searchData)
// };
