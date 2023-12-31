import React, { useState, useEffect } from "react";
import { useAuth } from "./LoginContext"; // Import the useAuth hook

function LoginForm({ email, setEmail }) {
  const { user, login, logout } = useAuth();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if the user is logged in on component mount
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      login(true); // Update the user state using the login function from useAuth
    }
  }, [login]);

  const handleLogin = async () => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Login successful, update your app's state to indicate the user is logged in
          login(); // Update the user state using the login function from useAuth
          localStorage.setItem("isLoggedIn", "true"); // Store login status
          setEmail(""); // Clear email field
          setPassword(""); // Clear password field
          setError(""); // Clear error

          // console.log("user logged in");
        } else {
          // Login failed, display an error message
          setError("Invalid email or password.");
        }
      } else {
        // Request failed for some reason, display a general error message
        setError("Login failed. Please try again later.");
      }
    } catch (error) {
      // Handle any unexpected errors here
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    // Logout the user by removing their login status from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.clear();
    logout(); // Update the user state using the logout function from useAuth
  };

  return (
    <div id="login-container">
      {user ? (
        <>
          <div id="logout-screen">
            <p id="logged-in-message">
              Welcome back, {email}! You are now logged in.
            </p>
            <button id="logout-button" onClick={handleLogout}>
              Logout
            </button>
            <br />
            <br />
            <br />
            <br />
          </div>
        </>
      ) : (
        <div id="login-screen">
          <br />
          <br />
          <form className="login-form">
            <div id="login-email">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div id="login-password" >
              <label  htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div id="login-button" >
              <button id="button" type="button" onClick={handleLogin}>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user ? (
        <></>
      ) : (
        <div id="create-account-container">
          <p id="create-account-text">Not Registered?</p>
          <a
            id="create-account-link"
            href="http://localhost:3000/create-account"
          >
            Create an account
          </a>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
