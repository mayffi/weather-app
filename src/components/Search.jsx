import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../dropDown.css";

function Search(props) {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);

  const citiesApiUrl = `https://city-and-state-search-api.p.rapidapi.com/cities/search?q=${search}&limit=5`;
  const citiesOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "67458faf35msh80cd056b037cd02p10ab4bjsnb37bc61599c1",
      "X-RapidAPI-Host": "city-and-state-search-api.p.rapidapi.com",
    },
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
    if (!getWeather) {
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
    <form onSubmit={getWeather}>
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
                <li key={city.id} onClick={() => handleOptionsClick(city.name)}>
                  {city.name} ,{city.country_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </div>
    </form>
  );
}

export default Search;
