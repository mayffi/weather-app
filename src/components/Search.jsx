import React, { useCallback, useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "../dropDown.css";

function Search(props) {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const timeout = useRef(null);

  const fetchOptions = useCallback(async () => {
    await fetch(`http://localhost:3001/cities/cities?namePrefix=${search}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) setOptions(data.data);
        console.log(data.data);
      })

      .catch((error) => {
        console.log("error", error);
      });
  }, [search]);

  const handleOptionsClick = (lat, lon) => {
    getWeather({ lat, lon });
    setOptions([]);
    if (!getWeather) {
      setOptions([]);
    }
  };

  const getWeather = ({ lat, lon }) => {
    props.onSearch(lat, lon); //takes care of the search when a user submits, passes to the parent component through props
  };

  const clearInput = () => {
    setSearch("");
   };

  const handleSearch = (e) => {
    clearTimeout(timeout.current);
    timeout.current = null;
    setSearch(e.target.value); //handles the value change when user types an input
    timeout.current = setTimeout(() => fetchOptions(), 300);
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
                <li
                  key={city.id}
                  onClick={() =>
                    handleOptionsClick(city.latitude, city.longitude)
                  }
                >
                  {city.name}, {city.country}
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
