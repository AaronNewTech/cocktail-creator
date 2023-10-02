import React, { useEffect, useState } from "react";
import DrinkDisplay from "./DrinkDisplay";
function DrinkSearch() {
  const [search, setSearch] = useState("");
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch("/drinks")
      .then((res) => res.json())
      .then((data) => {
        setDrinks(data);
        console.log(data);
      });
  }, []);

  let filter = drinks;
  if (search !== "") {
    filter = drinks.filter((drink) => {
      return drink.strDrink.toLowerCase().includes(search.toLowerCase());
    });
    filter.map((drink) => {
      return <DrinkDisplay key={drink.id} drink={drink} />;})
  }

  const drinkList = filter.map((drink) => {
    return <DrinkDisplay key={drink.id} drink={drink} />;
  });

  function handleChange(e) {
    const temp = e.target.value;
    setSearch(temp);
  }

  return (
    <div className="search-box">
      <h3>Type in your Search</h3>
      <label id="search-text" htmlFor="search">Search: </label>
      <input
        type="text"
        className="searchTerm"
        onChange={handleChange}
        value={search}
      />
      {search ? <div className="drink-list">{drinkList}</div> : <></>}
      
    </div>
  );
}

export default DrinkSearch;
