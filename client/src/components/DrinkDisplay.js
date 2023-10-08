import React from "react";
import FavoriteButton from "./FavoriteButton";

function DrinkDisplay({ drink, email }) {
  if (!drink) {
    return null;
  }

  return (
    <div>
      <br />
      <br />
      <div className="flex-container">
        <div className="drink-container">
          <h2 id="" >{drink.strDrink}</h2>

          <img id="drink-display-image" src={drink.strDrinkThumb} alt={drink.strDrink} />
          <h3 id="instructions">Instructions: </h3>
          <p>{drink.strInstructions}</p>

          <h3>Ingredients:</h3>
          <ul>
            {drink.drink_ingredient_associations.map((association) => (
              <li key={association.id}>{association.ingredient.name}</li>
            ))}
          </ul>

          <FavoriteButton drinkId={drink.id} email={email} />
        </div>
      </div>
    </div>
  );
}

export default DrinkDisplay;
