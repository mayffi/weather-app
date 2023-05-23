import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Search(props) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value); //handles the value change when user types an input
  };
  const getWeather = (e) => {
    e.preventDefault();
    props.onSearch(search); //takes care of the search when a user submits, passes to the parent component through props
  };
  return (
    <form onSubmit={getWeather}>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Enter a city"
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </div>
    </form>
  );
}

export default Search;
