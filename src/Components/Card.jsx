import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ carte, coperta, titlu, autor }) {
  return (
    <div className="mainCard">
      <button className="btn_adauga">Adaugă la carțile mele</button>

      <Link
        to={{
          pathname: `/bookpage/${carte.id}`,
          state: { product: carte },
        }}
        key={carte.id}
      >
        <img className="img_coperta" src={coperta} alt="imgcarte" />
      </Link>

      <h1 className="titlu_carte">{titlu}</h1>
      <h2 className="autor_carte">{autor}</h2>

      <button className="recenzie_btn">Lasă o recenzie</button>
    </div>
  );
}
