import React, { useEffect, useState } from "react";
import DrinkDisplay from "./DrinkDisplay";

function CocktailGenerator() {
  const [search, setSearch] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const spirits = [
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/2.png",
      text: [ "coke", "coca-cola", "coca cola", "pepsi-cola", "pepsi cola" ],
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/3.png",
      text: "ginger ale",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/4.png",
      text: "sparkling water",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/5.png",
      text: "tonic water",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/7.png",
      text: "orange juice",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/8.png",
      text: "grapefruit juice",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/9.png",
      text: "lime juice",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/10.png",
      text: "lemon juice",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/11.png",
      text: "pineapple juice",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/12.png",
      text: "tomato juice",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/14.png",
      text: "syrup",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/15.png",
      text: "grenadine",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/16.png",
      text: "cream",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/17.png",
      text: "coffee",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/19.png",
      text: "maraschino cherry",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/20.png",
      text: "lemon",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/21.png",
      text: "lime",
    },
    {
      image: process.env.PUBLIC_URL + "/images/mocktails/22.png",
      text: "mint",
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
          drink.strAlcoholic === "Non alcoholic" &&
          drink.strIngredient1.toLowerCase().includes(search.toLowerCase())) ||
        (drink.strIngredient2 &&
          drink.strAlcoholic === "Non alcoholic" &&
          drink.strIngredient2.toLowerCase().includes(search.toLowerCase())) ||
        (drink.strIngredient3 &&
          drink.strAlcoholic === "Non alcoholic" &&
          drink.strIngredient3.toLowerCase().includes(search.toLowerCase())) ||
        (drink.strIngredient4 &&
          drink.strAlcoholic === "Non alcoholic" &&
          drink.strIngredient4.toLowerCase().includes(search.toLowerCase())) ||
        (drink.strIngredient5 &&
          drink.strAlcoholic === "Non alcoholic" &&
          drink.strIngredient5.toLowerCase().includes(search.toLowerCase())) ||
        (drink.strIngredient6 &&
          drink.strAlcoholic === "Non alcoholic" &&
          drink.strIngredient6.toLowerCase().includes(search.toLowerCase()))
      );
    });
    filter.map((drink) => {
      return <DrinkDisplay key={drink.id} drink={drink} />;
    });
  }

  const drinkList = filter.map((drink) => {
    return <DrinkDisplay key={drink.id} drink={drink} />;
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
