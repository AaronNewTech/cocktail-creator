import React, { useEffect, useState } from "react";
import FavoriteButton from "./FavoriteButton";
import DrinkEdit from "./DrinkEdit";

function DrinkDisplay({ drink, email }) {
  const [currentDrink, setCurrentDrink] = useState(drink);
  const [updateData, setUpdateData] = useState({
    strDrink: "",
    strDrinkThumb: "",
    strIngredient1: "",
    strIngredient2: "",
    strIngredient3: "",
    strIngredient4: "",
    strIngredient5: "",
    strInstructions: "",
  });

  if (!currentDrink) {
    console.log("null");
    return null;
  }

  return (
    <div>
      <br />
      <br />
      <div className="flex-container">
        <div className="drink-container">
          <h2 id="">{currentDrink.strDrink}</h2>

          <img
            id="drink-display-image"
            src={currentDrink.strDrinkThumb}
            alt={currentDrink.strDrink}
          />
          <h3 id="instructions">Instructions: </h3>
          <p>{currentDrink.strInstructions}</p>

          <h3>Ingredients:</h3>
          <ul>
            {currentDrink.drink_ingredient_associations &&
              currentDrink.drink_ingredient_associations.map((association) => (
                <li key={association.id}>{association.ingredient.name}</li>
              ))}
          </ul>

          <FavoriteButton drinkId={drink.id} email={email} />
          <DrinkEdit
            currentDrink={currentDrink}
            setCurrentDrink={setCurrentDrink}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />
        </div>
      </div>
    </div>
  );
}

export default DrinkDisplay;
