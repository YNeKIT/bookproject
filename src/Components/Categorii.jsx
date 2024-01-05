import React from "react";
import Gun from "../Img/gun.svg";
import Compas from "../Img/compas.svg";
import Persoana from "../Img/persoana.svg";
import Smail from "../Img/smail.svg";
import Nojik from "../Img/nojik.svg";
import Drama from "../Img/drama.svg";
import Stiinte from "../Img/stiinte.svg";
import Finante from "../Img/finante.svg";
import Psihologie from "../Img/psihologie.svg";
import Horror from "../Img/horror.svg";
import Foc from "../Img/foc.svg";
import Lupa from "../Img/lupax.svg";
import Fitness from "../Img/fitness.svg";
import Romantica from "../Img/romantica.svg";
import Sageata from "../Img/sageata-dreapta.png";
import "./Categorii.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Categorii = () => {
  const [categorieData, setCategorieData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const fetchCategorieData = async (idGen, categoryName) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/genuri/${idGen}/carti`
      );
      console.log(response.data);
      setCategorieData(response.data.carti);
      setSelectedCategory(categoryName);

      // Redirect to the Catalog page with data
      navigate("/Catalog", {
        state: { carti: response.data.carti, selectedCategory: categoryName },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="MainCategorii">
      <h1>DESCOPERĂ CATEGORIILE POPULARE</h1>

      <div className="btncontainer">
        <button
          className="btncategorii"
          onClick={() => fetchCategorieData(7, "Acțiune")}
        >
          <img className="img_btns" src={Gun} alt="logo" />
          Acțiune
        </button>
        <button
          className="btncategorii"
          onClick={() => fetchCategorieData(8, "AVentură")}
        >
          <img className="img_btns" src={Compas} alt="logo" />
          Aventură
        </button>
        <button
          className="btncategorii"
          onClick={() => fetchCategorieData(2, "Autobiografie")}
        >
          <img className="img_btns" src={Persoana} alt="logo" />
          Autobiografie
        </button>
        <button
          className="btncategorii"
          onClick={() => fetchCategorieData(11, "Comedie")}
        >
          <img className="img_btns" src={Smail} alt="logo" />
          Comedie
        </button>
        <button className="btncategorii" onClick={() => fetchCategorieData(12)}>
          <img className="img_btns" src={Nojik} alt="logo" />
          Detectiv
        </button>

        <button className="btncategorii" onClick={() => fetchCategorieData(13)}>
          <img className="img_btns" src={Drama} alt="logo" />
          Dramă
        </button>
        <button className="btncategorii" onClick={() => fetchCategorieData(7)}>
          <img className="img_btns" src={Finante} alt="logo" />
          Finanțe
        </button>
        <button className="btncategorii" onClick={() => fetchCategorieData()}>
          <img className="img_btns" src={Horror} alt="logo" />
        </button>
        <button className="btncategorii" onClick={() => fetchCategorieData(1)}>
          <img className="img_btns" src={Lupa} alt="logo" />
          Ficțiune
        </button>
        <button className="btncategorii" onClick={() => fetchCategorieData(14)}>
          <img className="img_btns" src={Romantica} alt="logo" />
          Romantică
        </button>

        <button className="btncategorii" onClick={() => fetchCategorieData(11)}>
          <img className="img_btns" src={Stiinte} alt="logo" />
          Științe
        </button>
        <button className="btncategorii" onClick={() => fetchCategorieData(5)}>
          <img className="img_btns" src={Psihologie} alt="logo" />
          Psihologie
        </button>
        <button className="btncategorii" onClick={() => fetchCategorieData(3)}>
          <img className="img_btns" src={Foc} alt="logo" />
          Istorie
        </button>
        <button className="btncategorii" onClick={() => fetchCategorieData(10)}>
          <img className="img_btns" src={Fitness} alt="logo" />
          Diete/Fitness
        </button>

        <Link to="Catalog">
          <button className="btncategorii_verde">
            Vezi Toate
            <img className="sageata" src={Sageata} alt="logo" />{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Categorii;
