// npm start --prefix client
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import RandomDrink from "./RandomDrink";
import CreateAccount from "./CreateAccount";
import DrinkDisplay from "./DrinkDisplay";
import LoginForm from "./LoginForm";
import CreateDrink from "./CreateDrink";
import { LoginContext } from './LoginContext';
import AllDrinks from "./DrinksByName";
import AllUsers from "./AllUsers";
import DrinkSearch from "./DrinkSearch";
import Footer from "./Footer";

function App() {
  const [email, setEmail] = useState("");

  // const [randomCard, setRandomCard] = useState(null);

  // useEffect(() => {
  //   fetchRandomCard();
  // }, []);

  // const fetchRandomCard = () => {
  //   fetch("http://localhost:3000/drinks/1") // Fetch a single card by its ID (you might need to adjust the URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setRandomCard(data);
  //     });
  // };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm email={email} setEmail={setEmail} />} />
        <Route path="/users-with-drinks" element={<AllUsers  />} />
        <Route path="/random-drink" element={<RandomDrink />} />
        <Route path="/create-drink" element={<CreateDrink />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/drinks" element={<AllDrinks />} />
        <Route path="/drink-search" element={<DrinkSearch />} />
      </Routes>
      <Footer />
      
    </div>
  );
}

export default App;
