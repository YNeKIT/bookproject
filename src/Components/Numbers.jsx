import React from "react";
import Lupa from "../Img/lupa.svg";
import Carte1 from "../Img/carte1.png";
import Carte2 from "../Img/carte2.png";
import Carte3 from "../Img/carte3.png";
import Carte4 from "../Img/carte4.png";
import { Link } from "react-router-dom";
import "./Number.css";

export default function Numbers() {
  return (
    <div className="container">
      <div className="mainNumb">
        <Link to="CartePage">
          <h1 className="numbers1">1</h1>
        </Link>
        <img className="carte1" src={Carte1} alt="carte" />

        <h1 className="numbers2">2</h1>
        <img className="carte2" src={Carte2} alt="carte" />
        <h1 className="numbers3">3</h1>
        <img className="carte3" src={Carte3} alt="carte" />
        <h1 className="numbers4">4</h1>
        <img className="carte4" src={Carte4} alt="carte" />
      </div>

      <div className="numberstext">
        <h1 className="textnumb">Fa parte din comunitatea cititorilor</h1>
      </div>
    </div>
  );
}
