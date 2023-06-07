import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../dropDown.css";
// import { GEO_API_URL, geoApiOptions } from "../cityapi";
// import useExternalScript from "../hooks/useExternalScript"

function Search(props) {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState("");
  const [selectedOption, setselectedOption] = useState("");

  const geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=10&appid=a6325784400e2a1842ec60f14b587c3b`;

  const fetchOptions = useCallback(async () => {
    await fetch(geoAPI)
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, [search,geoAPI]);

  useEffect(() => {
    if (search.length) {
      fetchOptions();
    } else {
      setOptions([]);
    }
  }, [fetchOptions, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value); //handles the value change when user types an input
    setselectedOption("");

  };

  const getWeather = (e) => {
    e.preventDefault();
    props.onSearch(search); //takes care of the search when a user submits, passes to the parent component through props
  };

  const clearInput = () => {
    setSearch("");
  };

  // const handleOption = (e) => {
  //   setselectedOption(e.target.value);
  //   setSearch("");
  //   setOptions([]);
   
  // };

  const handleSelect = city =>{
    setSearch(city.name)
    setOptions([])
    console.log(city.name)
    console.log(city.lat, city.lon)
    props.onSearch(search);
  }

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
            <ul className="city-list" value={{ selectedOption }} onChange={handleSelect}>
            {options.map(city => ( <li key={city.id} onClick={handleSearch}>
              {city.name}
            </li>))}
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
