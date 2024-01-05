// Catalog.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Card from "../Components/Card";
import "./Catalog.css";
import Footer from "../Components/Footer";

export default function Catalog() {
  const location = useLocation();
  const carti =
    location.state && location.state.carti ? location.state.carti : [];
  const selectedCategory =
    location.state && location.state.selectedCategory
      ? location.state.selectedCategory
      : "";

  return (
    <div className="mainCatalog">
      <NavBar />

      <div className="secondCatalog">
        <h1 className="titlucatalog">{selectedCategory}</h1>

        <div className="cardContainer">
          {carti.map((carte, index) => (
            <Card
              titlu={carte.titlu}
              autor={carte.autor}
              key={index}
              carte={carte}
              coperta={require(`../carti/${carte.coperta}`)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
