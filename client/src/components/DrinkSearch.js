import React, { useEffect, useState } from "react";
import DrinkDisplay from "./DrinkDisplay";

function DrinkSearch() {
  const [search, setSearch] = useState("");
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/drinks")
      .then((res) => res.json())
      .then((data) => {
        setDrinks(data);
        // console.log(data);
      });
  }, []);

  let filter = drinks;
  if (search !== "") {
    filter = drinks.filter((drink) => {
      return drink.strDrink.toLowerCase().includes(search.toLowerCase());
    });
    filter.map((drink) => {
      return <DrinkDisplay key={drink.id} drink={drink} />;
    });
  }

  const drinkList = filter.map((drink) => {
    return <div className="flex-container" ><DrinkDisplay key={drink.id} drink={drink} /></div>;
  });

  function handleChange(e) {
    const temp = e.target.value;
    setSearch(temp);
  }
  // console.log(filter);
  return (
    <div>
      <div id="search-box">
        <h3>Type In Cocktail Name</h3>
        <label id="search-text" htmlFor="search">
          Search:{" "}
        </label>
        <input
          type="text"
          id="searchTerm"
          onChange={handleChange}
          value={search}
        />
      </div>
      <div id="flex-container">
        {search && filter.length !== 0 ? (
          <div className="drink-list">{drinkList}</div>
        ) : (
          <div id="drink-search-padding"></div>
        )}
      </div>
    </div>
  );
}

export default DrinkSearch;
