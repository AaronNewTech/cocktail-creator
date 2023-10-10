import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <img
        id="footer-main-image"
        src={process.env.PUBLIC_URL + "/images/footer/Reviews.png"}
        alt="footer-cocktail"
      />
      <div>
        <img
          id="footer-cocktail-image"
          src={process.env.PUBLIC_URL + "/images/homepage/Home6.png"}
          alt="footer-cocktail"
        />
        <div className="footer-social-icons">
          <NavLink to="https://www.facebook.com/">
            <img
              id="facebook-footer"
              src={process.env.PUBLIC_URL + "/images/homepage/Home3.png"}
              alt="footer-facebook-icon"
            />
          </NavLink>
          <NavLink to="https://instagram.com/">
            <img
              id="instagram-footer"
              src={process.env.PUBLIC_URL + "/images/homepage/Home5.png"}
              alt="footer-instagram-icon"
            />
          </NavLink>
          <NavLink to="https://twitter.com">
            <img
              id="twitter-footer"
              src={process.env.PUBLIC_URL + "/images/homepage/Home4.png"}
              alt="footer-twitter-icon"
            />
          </NavLink>
        </div>
      </div>

      <img
        id="footer-ready-image"
        src={process.env.PUBLIC_URL + "/images/footer/Reviews1.png"}
        alt="footer-cocktail"
      />
      <NavLink to="/cocktail-generator">
        <img
          id="footer-start-mixing-image"
          src={process.env.PUBLIC_URL + "/images/footer/Reviews2.png"}
          alt="footer-cocktail"
        />
      </NavLink>
      <img
        id="footer-email-list-image"
        src={process.env.PUBLIC_URL + "/images/footer/Reviews3.png"}
        alt="footer-cocktail"
      />

      <img
        id="footer-get-social-image"
        src={process.env.PUBLIC_URL + "/images/footer/Reviews4.png"}
        alt="footer-cocktail"
      />
    </div>
  );
}

export default Footer;
