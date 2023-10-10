import React, { useEffect, useState } from "react";
import DrinkDisplay from "./DrinkDisplay";

function AllDrinks() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllDrinks();
  }, []);

  const fetchAllDrinks = async () => {
    try {
      const response = await fetch("http://localhost:3000/drinks");

      if (response.ok) {
        const allDrinks = await response.json();
        setDrinks(allDrinks);
        setLoading(false)
      } else {
        console.error("Error fetching drinks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  // console.log(drinks)
  return (
    <div className="flex-container">
      {loading ? (
        <h3 id="no-random-drink">Loading</h3>
      ) : (
        drinks &&
        drinks.map((drink) => (
          <div className="display-container" key={drink.id}>
            <DrinkDisplay drink={drink} />
          </div>
        ))
      )}
    </div>
  );
}

export default AllDrinks;
