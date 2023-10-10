import React, { useEffect, useState } from "react";
import DrinkDisplay from "./DrinkDisplay";

function CocktailGenerator() {
  const [search, setSearch] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const mocktailIngredients1 = [
    {
      index: 0,
      image: process.env.PUBLIC_URL + "/images/mocktails/2.png",
      text: "coca-cola",
    },
    {
      index: 1,
      image: process.env.PUBLIC_URL + "/images/mocktails/3.png",
      text: "ginger ale",
    },
    {
      index: 2,
      image: process.env.PUBLIC_URL + "/images/mocktails/4.png",
      text: "carbonated water",
    },
    {
      index: 3,
      image: process.env.PUBLIC_URL + "/images/mocktails/5.png",
      text: "tonic water",
    },
  ];

  const mocktailIngredients2 = [
    {
      index: 4,
      image: process.env.PUBLIC_URL + "/images/mocktails/7.png",
      text: "orange juice",
    },
    {
      index: 5,
      image: process.env.PUBLIC_URL + "/images/mocktails/8.png",
      text: "grapefruit juice",
    },
    {
      index: 6,
      image: process.env.PUBLIC_URL + "/images/mocktails/9.png",
      text: "lime juice",
    },
    {
      index: 7,
      image: process.env.PUBLIC_URL + "/images/mocktails/10.png",
      text: "lemon juice",
    },
    {
      index: 8,
      image: process.env.PUBLIC_URL + "/images/mocktails/11.png",
      text: "pineapple juice",
    },
    {
      index: 9,
      image: process.env.PUBLIC_URL + "/images/mocktails/12.png",
      text: "tomato juice",
    },
  ];

  const mocktailIngredients3 = [
    {
      index: 10,
      image: process.env.PUBLIC_URL + "/images/mocktails/19.png",
      text: "maraschino cherry",
    },
    {
      index: 11,
      image: process.env.PUBLIC_URL + "/images/mocktails/20.png",
      text: "lemon",
    },
    {
      index: 12,
      image: process.env.PUBLIC_URL + "/images/mocktails/21.png",
      text: "lime",
    },
    {
      index: 13,
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
    return (
      <div className="flex-container" key={drink.id}>
        <DrinkDisplay drink={drink} />
      </div>
    );
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
          src="/images/ingredientheaders/Plans4.png"
          alt="spirits-logo"
        />
      </div>

      {/* <div className="spirit-buttons" >
      {spirits.map((spirit, index) => (
                <div key={index}>
                    <img id="spirit-buttons" src={spirit.image} />
                    <input className="spirit" type="checkbox" value={spirit.text} name="spirit" onChange={handleChange}
         />
                </div>
            ))}
</div> */}

      <div className="spirit-buttons">
        {mocktailIngredients1.map((spirit) => (
          <div key={spirit.index} className="spirit-item">
            <img src={spirit.image} alt={spirit.text} id="spirit-buttons" />
            <input
              type="checkbox"
              value={spirit.text}
              name="spirit"
              onChange={(event) => handleCheckboxChange(event, spirit.index)}
              checked={selectedDrink === spirit.index}
            />
          </div>
        ))}
      </div>
      <div id="mocktail-spacer-1">
        <div id="spirits-logo-container">
          <img
            id="spirits-logo"
            src="/images/ingredientheaders/Plans6.png"
            alt="spirits-logo"
          />
        </div>

        <div className="spirit-buttons">
          {mocktailIngredients2.map((spirit) => (
            <div key={spirit.index} className="spirit-item">
              <img src={spirit.image} alt={spirit.text} id="spirit-buttons" />
              <input
                type="checkbox"
                value={spirit.text}
                name="spirit"
                onChange={(event) => handleCheckboxChange(event, spirit.index)}
                checked={selectedDrink === spirit.index}
              />
            </div>
          ))}
        </div>
      </div>

      <div id="mocktail-spacer-2">
        <div id="spirits-logo-container">
          <img
            id="spirits-logo"
            src="/images/ingredientheaders/Plans.png"
            alt="spirits-logo"
          />
        </div>

        <div className="garnish-buttons">
          {mocktailIngredients3.map((spirit) => (
            <div key={spirit.index} className="spirit-item">
              <img src={spirit.image} alt={spirit.text} id="spirit-buttons" />
              <input
                type="checkbox"
                value={spirit.text}
                name="spirit"
                onChange={(event) => handleCheckboxChange(event, spirit.index)}
                checked={selectedDrink === spirit.index}
              />
            </div>
          ))}
        </div>
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
