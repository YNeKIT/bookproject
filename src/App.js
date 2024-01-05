import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import Catalog from "./Pages/Catalog";
import CartePage from "./Pages/CartePage";
import Profil from "./Pages/Profil";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/bookpage/:id" element={<CartePage />} />
        <Route path="/ProfilPage" element={<Profil />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
