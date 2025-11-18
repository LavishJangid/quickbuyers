import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login"); // "Login" or "Sign Up"
  const [termsChecked, setTermsChecked] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function executed", formData);

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const signup = async () => {
    console.log("SignUp function executed", formData);

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.message || responseData.error || "Signup failed");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const toggleState = () => {
    setState(state === "Login" ? "Sign Up" : "Login");
    setTermsChecked(false); // reset checkbox
    setFormData({ username: "", email: "", password: "" }); // reset form
  };

  const handleCheckbox = () => {
    setTermsChecked(!termsChecked);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>

        {/* Input Fields */}
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>

        {/* Terms & Conditions (only for Sign Up) */}
        {state === "Sign Up" && (
          <div className="loginsignup-terms">
            <input
              type="checkbox"
              id="terms"
              checked={termsChecked}
              onChange={handleCheckbox}
            />
            <label htmlFor="terms">
              I accept the <span>Terms & Conditions</span>
            </label>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={state === "Login" ? login : signup}
          disabled={state === "Sign Up" && !termsChecked}
        >
          Continue
        </button>

        {/* Toggle Login/Signup */}
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={toggleState}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an Account?{" "}
            <span onClick={toggleState}>Click Here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
