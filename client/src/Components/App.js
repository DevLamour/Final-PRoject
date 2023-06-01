import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import WorkoutPlan from "./WorkoutPlan";
import WaterTracker from "./WaterTracker";
import ContactUs from "./ContactUs";
import Login from "./Login";
import SignupForm from "./SignupForm";
import { NavLink, Link } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (formData) => {
    // Perform login logic here (e.g., validate credentials)
    // Set isLoggedIn state based on the login result

    // For demonstration purposes, let's assume the login is successful
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/workout"
          element={<WorkoutPlan isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/water"
          element={<WaterTracker isLoggedIn={isLoggedIn} />}
        />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
};

export default App;
