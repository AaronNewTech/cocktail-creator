import React, { useEffect, useState } from "react";
import DrinkDisplay from "./DrinkDisplay";

function RandomDrink() {
  const [randomDrink, setRandomDrink] = useState(null);
  const minDrinkId = 11000;
  const maxDrinkId = 20000;

  useEffect(() => {
    fetchRandomDrink();
  }, []);

  const fetchRandomDrink = async () => {
  try {
    // Get valid drink IDs once
    const idsRes = await fetch("https://cocktail-creator-backend.vercel.app/drinks-ids");
    if (!idsRes.ok) throw new Error("Failed to fetch valid drink IDs");
    const validIds = await idsRes.json();

    // Choose a random ID from the list
    const randomId = validIds[Math.floor(Math.random() * validIds.length)];

    // Fetch the drink by ID
    const drinkRes = await fetch(`https://cocktail-creator-backend.vercel.app/drinks/${randomId}`);
    if (!drinkRes.ok) throw new Error(`Drink not found at ID ${randomId}`);
    const randomDrink = await drinkRes.json();

    setRandomDrink(randomDrink);
  } catch (error) {
    console.error("Error fetching random drink:", error);
  }
};


  return (
    <div className="flex-container">
      {randomDrink ? 
      randomDrink && (
        <div className="display-container">
          <DrinkDisplay drink={randomDrink} />
        </div>
      ) : <h3 id="no-random-drink" >Loading</h3>}
    </div>
  );
}

export default RandomDrink;
