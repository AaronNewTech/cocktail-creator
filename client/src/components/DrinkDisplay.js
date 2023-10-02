import React from "react";
// import FavoriteButton from "./FavoriteButton";

function DrinkDisplay({ drink, onFavoriteClick }) {
  if (!drink) {
    return null;
  }

  return (
    <div>
      <br />
      <br />
      <div className="flex-container">
        <div className="drink-container">
          <h2>{drink.strDrink}</h2>

          <img src={drink.strDrinkThumb} alt={drink.strDrink} />
          <h3>Instructions: </h3>
          <p>{drink.strInstructions}</p>

          <h3>Ingredients:</h3>
          <ul>
            {drink.drink_ingredient_associations.map((association) => (
              <li key={association.id}>{association.ingredient.name}</li>
            ))}
          </ul>
          <button onClick={() => onFavoriteClick(drink.id)}>
            Add to Favorites
          </button>
          {/* {drink.strVideo && (
            <iframe
              title={drink.strDrink}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${getVideoIdFromUrl(drink.strVideo)}`}
              allowFullScreen
            ></iframe>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default DrinkDisplay;
