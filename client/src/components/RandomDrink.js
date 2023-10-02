import React, { useEffect, useState } from "react";
import DrinkDisplay from "./DrinkDisplay";

function RandomDrink() {
  const [randomDrink, setRandomDrink] = useState(null);
  const minDrinkId = 11000;
  const maxDrinkId = 11700;

  useEffect(() => {
    fetchRandomDrink();
  }, []);

  const fetchRandomDrink = async () => {
    try {
      const response = await fetch("http://localhost:3000/drinks");
  
      if (response.ok) {
        const allDrinks = await response.json();
  
        let randomDrinkId;
        let randomDrink;
  
        const findRandomDrink = () => {
          randomDrinkId =
            Math.floor(Math.random() * (maxDrinkId - minDrinkId + 1)) +
            minDrinkId;
          randomDrink = allDrinks.find((drink) => drink.id === randomDrinkId);
          return !randomDrink;
        };
  
        while (findRandomDrink()) {}
  
        setRandomDrink(randomDrink);
      } else {
        console.error("Error fetching drinks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };
  

  return (
    <div className="flex-container">
      {randomDrink && (
        <div className="display-container">
          <DrinkDisplay drink={randomDrink} />
        </div>
      )}
    </div>
  );
}

export default RandomDrink;
