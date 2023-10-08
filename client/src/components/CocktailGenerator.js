import React, { useEffect, useState } from "react";
import DrinkDisplay from "./DrinkDisplay";

function CocktailGenerator() {
  const [search, setSearch] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const spirits = [
    {
      image: process.env.PUBLIC_URL + "/images/spirits/brandy.png",
      text: "brandy",
    },
    {
      image: process.env.PUBLIC_URL + "/images/spirits/cognac.png",
      text: "cognac",
    },
    {
      image: process.env.PUBLIC_URL + "/images/spirits/gin.png",
      text: "gin",
    },
    {
      image: process.env.PUBLIC_URL + "/images/spirits/rum.png",
      text: "rum",
    },
    {
      image: process.env.PUBLIC_URL + "/images/spirits/scotch.png",
      text: "scotch",
    },
    {
      image: process.env.PUBLIC_URL + "/images/spirits/tequila.png",
      text: "tequila",
    },
    {
      image: process.env.PUBLIC_URL + "/images/spirits/vodka.png",
      text: "vodka",
    },
    {
      image: process.env.PUBLIC_URL + "/images/spirits/whiskey.png",
      text: "whiskey",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/drinks")
      .then((res) => res.json())
      .then((data) => {
        setDrinks(data);
        // console.log(data);
      });
  }, []);

  let filter = drinks;
  if (search !== "") {
    filter = drinks.filter((drink) => {
      return (
        (drink.strIngredient1 &&
          drink.strIngredient1.toLowerCase().includes(search.toLowerCase())) ||
        (drink.strIngredient2 &&
          drink.strIngredient2.toLowerCase().includes(search.toLowerCase())) ||
        (drink.strIngredient3 &&
          drink.strIngredient3.toLowerCase().includes(search.toLowerCase())) ||
        (drink.strIngredient4 &&
          drink.strIngredient4.toLowerCase().includes(search.toLowerCase())) ||
        (drink.strIngredient5 &&
          drink.strIngredient5.toLowerCase().includes(search.toLowerCase())) ||
        (drink.strIngredient6 &&
          drink.strIngredient6.toLowerCase().includes(search.toLowerCase()))
      );
    });
    filter.map((drink) => {
      return <DrinkDisplay key={drink.id} drink={drink} />;
    });
  }

  const drinkList = filter.map((drink) => {
    return <div className="flex-container" ><DrinkDisplay key={drink.id} drink={drink} /></div>;
  });

  const handleCheckboxChange = (event, index, value) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedDrink(index);
      const temp = event.target.value;
      setSearch(temp);
    } else {
      setSelectedDrink(null);
      setSearch("");
    }
  };

  // console.log(drinkList);
  return (
    <div>
      <div>
        <img
          id="create-cocktail-logo"
          src="/images/ingredientheaders/Plans1.png"
          alt="create-cocktail-logo"
        />
      </div>
      <div id="spirits-logo-container">
        <img
          id="spirits-logo"
          src="/images/ingredientheaders/Plans2.png"
          alt="spirits-logo"
        />
      </div>

      <div className="spirit-buttons">
        {spirits.map((spirit, index) => (
          <div key={index} className="spirit-item">
            <img src={spirit.image} alt={spirit.text} id="spirit-buttons" />
            <input
              type="checkbox"
              value={spirit.text}
              name="spirit"
              onChange={(event) => handleCheckboxChange(event, index)}
              checked={selectedDrink === index}
            />
          </div>
        ))}
      </div>

      {search && filter.length !== 0 ? (
        <div className="drink-list">{drinkList}</div>
      ) : (
        <div id="drink-search-padding"></div>
      )}
    </div>
  );
}

export default CocktailGenerator;
