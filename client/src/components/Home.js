import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import EmailPopup from "./EmailPopup";

Modal.setAppElement("#root");

function Home() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [mousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  const thresholdY = 10; // Adjust this value as needed

  // Track mouse position
  function handleMouseMove(ev) {
    const mouseY = ev.clientY;

    // Check if the cursor position is at the top of the window to trigger the modal
    if (mouseY <= thresholdY) {
      openModal();
      // } else {
      //   closeModal();
      // }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(showModal);
 
  return (
    <div>
      <div id="home-page-1"> {showModal ? null
         : <NavLink to="/cocktail-generator">
          
          <img
            id="mixing-button-image"
            src={process.env.PUBLIC_URL + "/images/homepage/Home7.png"}
            alt="login"
          /> 
        </NavLink>}

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
                src={
                  process.env.PUBLIC_URL + "/images/homepage/mocktail-logo.png"
                }
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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "0.5%",
          zIndex: 150, 
        }}
        onMouseMove={(ev) => handleMouseMove(ev)}
      ></div>

      {showModal && (
        <Modal
        isOpen={showModal}
        contentLabel="Example Modal"
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // This is the overlay background color with reduced opacity
            zIndex: 9999, // Adjust as needed
           
          },
          content: {
            width: "50%",
            height: "80%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // marginBottom: "-50%",
            overflow: "hidden",
            backgroundColor: "transparent",
            borderColor: "transparent",
          },
        }}
      >
        <EmailPopup />
      </Modal>
      
      )}
    </div>
  );
}

export default Home;
