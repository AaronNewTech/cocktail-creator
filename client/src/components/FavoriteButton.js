import React, { useState, useEffect } from "react";
import { useAuth } from "./LoginContext";

function FavoriteButton({ drinkId, email }) {
  const { user } = useAuth();
  const [userFavoriteDrinks, setUserFavoriteDrinks] = useState([]);
  const [isDrinkFavorited, setIsDrinkFavorited] = useState(false);

  // Load favorited drinks from localStorage on component mount
  useEffect(() => {
    fetchUserFavoriteDrinks();
  }, []);

  // Fetch user's favorite drinks
  const fetchUserFavoriteDrinks = async () => {
    try {
      const response = await fetch("user_favorite_drinks_button");

      if (response.ok) {
        const userDrinkData = await response.json();
        setUserFavoriteDrinks(userDrinkData);
      }
    } catch (error) {
      console.error("An error occurred while fetching favorite drinks:", error);
    }
  };

  // Update isDrinkFavorited whenever userFavoriteDrinks or drinkId changes
  useEffect(() => {
    setIsDrinkFavorited(
      userFavoriteDrinks.some((favoriteDrink) => favoriteDrink.drink_id === drinkId)
    );
  }, [userFavoriteDrinks, drinkId]);

  const handleFavoriteClick = async () => {
    try {
      if (isDrinkFavorited) {
        // If already favorited, send a DELETE request to remove it from favorites on the server
        const response = await fetch(`/user_favorite_drinks/${drinkId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Remove the drink from the user's favorite drinks list in local storage
          setUserFavoriteDrinks((prevFavoriteDrinks) =>
          prevFavoriteDrinks.filter((FavoriteDrink) => FavoriteDrink.drink_id !== drinkId)
          );
        } else {
          console.error("Failed to remove drink from favorites on the server");
        }
      } else {
        // If not favorited, send a POST request to add it to favorites on the server
        const response = await fetch("/favorite_drinks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, drinkId }),
        });
        if (response.ok) {
          // Add the drink to the user's favorite drink list in local storage
          setUserFavoriteDrinks((prevFavoriteDrinks) => [
            ...prevFavoriteDrinks,
            { drink_id: drinkId },
          ]);
        } else {
          console.error("Failed to add drink to favorites on the server");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // console.log(userFavoriteDrinks)
  return (
    <div>
      {user ? (
        <div >
          {isDrinkFavorited ? <div>
        <img onClick={handleFavoriteClick}
          id="unfavorite-button"
          src="/images/buttons/unfavorite-button.png"
          alt="unfavorite-button"
        />
      </div> : <div>
        <img onClick={handleFavoriteClick}
          id="favorite-button"
          src="/images/buttons/favorite-button.png"
          alt="favorite-button"
        />
      </div>}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default FavoriteButton;
