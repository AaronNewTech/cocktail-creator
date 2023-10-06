import React, { useState, useEffect } from "react";
// import * as yup from "yup";
import { useFormik } from "formik";

function CreateDrink({ email }) {
  const [formErrors, setFormErrors] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/drinks")
      .then((r) => r.json())
      .then(setDrinks);
  }, []);

  const addDrink = (newDrink) => {
    setDrinks([...drinks, newDrink]);
  };

  const formik = useFormik({
    initialValues: {
      drinkName: "",
      ingredients: ["", "", "", "", ""],
      instructions: "",
      imageURL: "",
    },
    onSubmit: async (values) => {
      const newDrink = {
        strDrink:
          values.drinkName.charAt(0).toUpperCase() + values.drinkName.slice(1),
        strDrinkThumb:
          values.imageURL.charAt(0).toUpperCase() + values.imageURL.slice(1),
        strIngredient1:
          values.ingredients[0].charAt(0).toUpperCase() +
          values.ingredients[0].slice(1),
        strIngredient2:
          values.ingredients[1].charAt(0).toUpperCase() +
          values.ingredients[1].slice(1),
        strIngredient3:
          values.ingredients[2].charAt(0).toUpperCase() +
          values.ingredients[2].slice(1),
        strIngredient4:
          values.ingredients[3].charAt(0).toUpperCase() +
          values.ingredients[3].slice(1),
        strIngredient5:
          values.ingredients[4].charAt(0).toUpperCase() +
          values.ingredients[4].slice(1),
        strInstructions:
          values.instructions.charAt(0).toUpperCase() +
          values.instructions.slice(1),
      };
      // console.log(newDrink);
      const response = await fetch("/create_drink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDrink),
      });
      if (response.ok) {
        const drink = await response.json();
        addDrink(drink);
        formik.resetForm();
        setFormErrors([]);
        let drinkId = drink.id;
        const favResponse = await fetch("/favorite_drinks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, drinkId }),
        });
        if (favResponse.ok) {
        } else {
          console.error("Failed to add drink to favorites on the server");
        }
      } else {
        const err = await response.json();
        setFormErrors(err.errors);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-drink-form">
      <input
        id="drinkName"
        name="drinkName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.drinkName}
        placeholder="Drink Name"
      />
      {formik.values.ingredients.map((ingredient, index) => (
        <input
          key={index}
          id={`ingredients[${index}]`}
          name={`ingredients[${index}]`}
          type="text"
          onChange={formik.handleChange}
          value={formik.values.ingredients[index]}
          placeholder={`Ingredient ${index + 1}`}
        />
      ))}

      <input
        id="imageURL"
        name="imageURL"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.imageURL}
        placeholder="Image URL"
      />
      <textarea
        id="instructions"
        name="instructions"
        onChange={formik.handleChange}
        value={formik.values.instructions}
        placeholder="Instructions"
        rows={5}
      />
      {formErrors.length > 0
        ? formErrors.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))
        : null}
      <input type="submit" value="Add Drink" />
    </form>
  );
}

export default CreateDrink;
