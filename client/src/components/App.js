// npm start --prefix client
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import RandomDrink from "./RandomDrink";
import CreateAccount from "./CreateAccount";
import LoginForm from "./LoginForm";
import CreateDrink from "./CreateDrink";
import AllDrinks from "./AllDrinks";
import UserFavorites from "./UserFavorites";
import DrinkSearch from "./DrinkSearch";
import Footer from "./Footer";
import CocktailGenerator from "./CocktailGenerator";
import MocktailSearch from "./MocktailSearch";

function App() {
  const [email, setEmail] = useState("");

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/login"
          element={<LoginForm email={email} setEmail={setEmail} />}
        />
        <Route path="/user-favorites" element={<UserFavorites />} />
        <Route path="/random-drink" element={<RandomDrink />} />
        <Route
          path="/create-drink"
          element={<CreateDrink email={email} setEmail={setEmail} />}
        />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/drinks" element={<AllDrinks />} />
        <Route path="/drink-search" element={<DrinkSearch />} />
        <Route path="/cocktail-generator" element={<CocktailGenerator />} />
        <Route path="/mocktail-search" element={<MocktailSearch />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
