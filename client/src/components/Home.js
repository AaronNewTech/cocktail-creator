import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  // const [drinks, setDrinks] = useState([]);

  // useEffect(() => {
  //   fetchSpecificDrinks();
  // }, []);

  // const fetchSpecificDrinks = async () => {
  //   const drinkIds = [11000, 11009, 11470, 11053];
  //   let specificDrinks = [];

  //   for (const drinkId of drinkIds) {
  //     const response = await fetch(`http://localhost:3000/drinks/${drinkId}`);

  //     if (response.ok) {
  //       const specificDrink = await response.json();
  //       specificDrinks.push(specificDrink);
  //     }
  //   }

  //   setDrinks(specificDrinks);
  // };

  return (
    <div>
      <div id="home-page-1">
        <NavLink to={"/login"}>
          <img
            id="mixing-button-image"
            src={process.env.PUBLIC_URL + "/images/homepage/Home7.png"}
            alt="login"
          />
        </NavLink>

        <img
          id="bartender-image"
          src={process.env.PUBLIC_URL + "/images/homepage/Home2.png"}
          alt="speech-trainer-logo"
        />
      </div>
      <div id="home-page-2">
        <div className="row-3">
          <div className="column-2">
            <NavLink to="/videos">
              <div className="image-container">
                <img
                  id="video-speech-trainer-logo"
                  src={process.env.PUBLIC_URL + "/images/homepage/Products.png"}
                  alt="Video Speech Trainer"
                />
              </div>
            </NavLink>
          </div>

          <div className="column-2">
            <NavLink to="/drink-search">
              <img
                id="first-words-logo"
                src={process.env.PUBLIC_URL + "/images/homepage/Products1.png"}
                alt="Video Speech Trainer"
              />
            </NavLink>
          </div>
          <div className="column-2">
            <NavLink to="/videos">
              <img
                id="games-logo"
                src={process.env.PUBLIC_URL + "/images/homepage/Products2.png"}
                alt="Video Speech Trainer"
              />
            </NavLink>
          </div>
        </div>
        <div className="row-4">
          <img
            id="make-my-cocktail-image"
            src={process.env.PUBLIC_URL + "/images/homepage/Products6.png"}
            alt="home-learning-center"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
