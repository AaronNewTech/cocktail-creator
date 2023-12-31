import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./LoginContext";

function NavBar() {
  const { user } = useAuth();

  return (
    <div>
      <nav className="navbarStyles">
        <div id="navbar-logo-container">
          <NavLink to="/">
            <img
              id="navbar-logo"
              src={process.env.PUBLIC_URL + "/images/homepage/Home6.png"}
              alt="home-page-logo"
            />
          </NavLink>
        </div>
        <div className="navbar-links">
          <NavLink to="/"> Home </NavLink>
          {user ? (
            <NavLink to="/login"> Logout </NavLink>
          ) : (
            <NavLink to="/login"> Login </NavLink>
          )}

          {user ? (
            <NavLink to="/user-favorites"> My Favorites </NavLink>
          ) : (
            <NavLink to="/create-account"> Create Account </NavLink>
          )}

          {/* {user ? (
            <></>
          ) : (
            
          )} */}

          <div className="dropdown">
            <NavLink>Drink Search</NavLink>
            <div>
              <div className="dropdown-content">
                <br />
                <div>
                  <NavLink to="/cocktail-generator">
                    {" "}
                    Cocktail Generator{" "}
                  </NavLink>
                </div>
                <br />
                <div>
                  <NavLink to="/drink-search"> Search by Name </NavLink>
                </div>
                <br />
                <div>
                  <NavLink to="/mocktail-search"> Search for Mocktail </NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <NavLink>My Drinks</NavLink>
            <div>
              <div className="dropdown-content">
                <br />
                <div>
                  <NavLink to="/random-drink"> Random Drink </NavLink>
                </div>
                <br />
                <div>
                  <NavLink to="/create-drink"> Create Drink </NavLink>
                </div>
                <br />
                <div>
                  <NavLink to="/drinks"> See All Drinks </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="social-icons">
          <NavLink to="https://www.facebook.com/">
            <img
              id="facebook"
              src={process.env.PUBLIC_URL + "/images/homepage/Home3.png"}
              alt="facebook-icon"
            />
          </NavLink>
          <NavLink to="https://instagram.com/">
            <img
              id="instagram"
              src={process.env.PUBLIC_URL + "/images/homepage/Home5.png"}
              alt="instagram-icon"
            />
          </NavLink>
          <NavLink to="https://twitter.com">
            <img
              id="twitter"
              src={process.env.PUBLIC_URL + "/images/homepage/Home4.png"}
              alt="twitter-icon"
            />
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
