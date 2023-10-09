import React, { useState } from "react";
import FavoriteButton from "./FavoriteButton";

function DrinkEdit({
  currentDrink,
  setCurrentDrink,
  updateData,
  setUpdateData,
}) {
  //   console.log(currentDrink);
  const [selectedDrink, setSelectedDrink] = useState(null);
  //   const drinkId = currentDrink.id;

  //   const fetchAllDrinks = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/drinks");

  //       if (response.ok) {
  //         const allDrinks = await response.json();
  //         setDrinks(allDrinks);
  //       } else {
  //         console.error("Error fetching drinks:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching drinks:", error);
  //     }
  //   };

  const handleDelete = async (drinkId) => {
    try {
      const response = await fetch(`http://localhost:3000/drinks/${drinkId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Drink deleted successfully, update the drinks list by refetching
        setCurrentDrink(null);
      } else {
        console.error("Error deleting drink:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting drink:", error);
    }
  };

  const handleEdit = (drink) => {
    // Set the selected drink for editing
    setSelectedDrink(drink);
    // Initialize the updateData with the current drink's data
    setUpdateData({
      id: drink.id,
      strDrink: drink.strDrink || "",
      strDrinkThumb: drink.strDrinkThumb || "",
      strIngredient1: drink.strIngredient1 || "",
      strIngredient2: drink.strIngredient2 || "",
      strIngredient3: drink.strIngredient3 || "",
      strIngredient4: drink.strIngredient4 || "",
      strIngredient5: drink.strIngredient5 || "",
      strInstructions: drink.strInstructions || "",
    });
  };

  const handleUpdate = async (drinkId) => {
    try {
      const response = await fetch(`http://localhost:3000/drinks/${drinkId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
  
      if (response.ok) {
        const drink = await response.json();
        setCurrentDrink(drink);
        setSelectedDrink(null);
        console.log("Drink updated successfully");
        console.log(drink);
      } else {
        console.error("Error updating drink:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating drink:", error);
    }
  };
  

  return (
    <div>
      {currentDrink.strCategory === "User created" ? (
        <div>
          {" "}
          <button onClick={() => handleDelete(currentDrink.id)}>Delete</button>
          <button onClick={() => handleEdit(currentDrink)}>Edit</button>
          {selectedDrink && selectedDrink.id === currentDrink.id && (
            <div>
              <input
                type="text"
                placeholder="Drink Name"
                value={updateData.strDrink}
                onChange={(e) =>
                  setUpdateData({ ...updateData, strDrink: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                value={updateData.strDrinkThumb}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    strDrinkThumb: e.target.value,
                  })
                }
              />
              {[1, 2, 3, 4, 5].map((i) => (
                <input
                  type="text"
                  key={i}
                  placeholder={`Ingredient ${i}`}
                  value={updateData[`strIngredient${i}`]}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      [`strIngredient${i}`]: e.target.value,
                    })
                  }
                />
              ))}
              <textarea
                placeholder="Instructions"
                value={updateData.strInstructions}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    strInstructions: e.target.value,
                  })
                }
              />
              <button onClick={() => handleUpdate(selectedDrink.id)}>
                Save
              </button>
              <button onClick={() => setSelectedDrink(null)}>Cancel</button>
            </div>
          )}{" "}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DrinkEdit;
