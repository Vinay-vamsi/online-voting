import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Voting from "./components/Voting";
import Results from "./components/Results";
import "./App.css";

function App() {
  return (
    <Router> {/* Wrap everything inside BrowserRouter */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;







