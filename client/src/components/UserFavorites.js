import React, { useState, useEffect } from "react";
import DrinkDisplay from "./DrinkDisplay";

function UserFavorites() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllDrinks();
  }, []);

  const fetchAllDrinks = async () => {
    try {
      const response = await fetch("/user_favorite_drinks");

      if (response.ok) {
        const allDrinks = await response.json();
        setDrinks(allDrinks);
        // console.log(allDrinks);
      } else {
        console.error("Error fetching drinks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  return (
    <div id="drink-card-library">
      <br />
      <br />
      <h2 id="user-favorites">Your Favorite Drinks</h2>
      {drinks.length !== 0 ? (
        <div className="flex-container">
          {drinks &&
            drinks.map((drink) => (
              <div className="display-container" key={drink.id}>
                <DrinkDisplay drink={drink} />
              </div>
            ))}
        </div>
      ) : (
        <h3 id="no-drinks-message">No Drinks. Please Add a Favorite</h3>
      )}
      <br />
      <br />
    </div>
  );
}

export default UserFavorites;
