import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div id="home-page-1">
        <NavLink to="/cocktail-generator">
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
            <NavLink to="/cocktail-generator">
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
            <NavLink to="/mocktail-search">
              <img
                id="games-logo"
                src={process.env.PUBLIC_URL + "/images/homepage/mocktail-logo.png"}
                alt="Video Speech Trainer"
              />
            </NavLink>
          </div>
        </div>
        <div className="row-4">
          <NavLink to="/cocktail-generator">
            <img
              id="cocktail-generator-image"
              src={
                process.env.PUBLIC_URL +
                "/images/homepage/cocktail-generator.png"
              }
              alt="home-learning-center"
            />
          </NavLink>
          <NavLink to="/drink-search">
            <img
              id="cocktail-search-image"
              src={
                process.env.PUBLIC_URL + "/images/homepage/cocktail-search.png"
              }
              alt="home-learning-center"
            />
          </NavLink>
          <NavLink to="/mocktail-search">
            <img
              id="mocktail-search-image"
              src={
                process.env.PUBLIC_URL + "/images/homepage/mocktail-search.png"
              }
              alt="home-learning-center"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
