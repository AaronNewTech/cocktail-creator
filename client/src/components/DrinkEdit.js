import React, { useState } from "react";

function DrinkEdit({
  currentDrink,
  setCurrentDrink,
  updateData,
  setUpdateData,
}) {
  //   console.log(currentDrink);
  const [selectedDrink, setSelectedDrink] = useState(null);

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
        // console.log(drink);
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
          <img
            onClick={() => handleDelete(currentDrink.id)}
            id="delete-button"
            src="/images/buttons/delete-button.png"
            alt="delete-button"
          />
          <img
            onClick={() => handleEdit(currentDrink)}
            id="edit-button"
            src="/images/buttons/edit-button.png"
            alt="edit-button"
          />
          {selectedDrink && selectedDrink.id === currentDrink.id && (
            <div className="drink-edit-form" id="drink-edit-form">
              <div>
                <label>Drink Name</label>
                <input
                  type="text"
                  placeholder="Drink Name"
                  value={updateData.strDrink}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, strDrink: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Image URL</label>
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
                />{" "}
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div>
                  <label>{`Ingredient ${i}`}</label>
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
                /></div>
              ))}
              <div>
                <label>Instructions</label>
              <textarea
                placeholder="Instructions"
                value={updateData.strInstructions}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    strInstructions: e.target.value,
                  })
                }
              /></div>
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
