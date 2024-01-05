// CartePage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CartePage.css";
import NavBar from "../Components/NavBar";
import { FaStar } from "react-icons/fa";
import Modal from "../Components/Modal";
import "../Components/Modal.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartePage() {
  const { id } = useParams();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [carte, setCarte] = useState(null);
  const [recenzii, setRecenzii] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [idColectie, setIdColectie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carteResponse = await axios.get(
          `http://127.0.0.1:5000/api/carte/${id}`
        );
        setCarte(carteResponse.data.carte);

        const recenziiResponse = await axios.get(
          `http://127.0.0.1:5000/api/recenzii/${id}`
        );
        setRecenzii(recenziiResponse.data.recenzii);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const storedIdColectie = localStorage.getItem("id_colectie");
    setIdColectie(storedIdColectie);
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = async () => {
    setModalOpen(false);

    try {
      const recenziiResponse = await axios.get(
        `http://127.0.0.1:5000/api/recenzii/${id}`
      );
      setRecenzii(recenziiResponse.data.recenzii);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddToCollection = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/add_book_to_collection", {
        id_carte: id,
        id_colectie: idColectie,
      });

      toast.success("Book added to collection successfully");
      console.log("Book added to collection successfully");
    } catch (error) {
      toast.error("Error adding book to collection");
      console.error("Error adding book to collection:", error);
    }
  };

  if (!carte) {
    return <p>Încărcare...</p>;
  }

  return (
    <div className="mainCarte">
      <NavBar />

      <div className="secondprincipaldiv">
        <div className="cartecontainer">
          <div className="img_raiting">
            <img
              className="img_cartepage"
              src={require(`../carti/${carte.coperta}`)}
              alt={carte.titlu}
            />
            <div className="raiting">
              <p className="raiting_carte">Rating: {carte.raiting}</p>
            </div>
          </div>

          <div className="right_side">
            <h1 className="titlu-carte">{carte.titlu}</h1>
            <h3 className="autor-carte">de {carte.autor}</h3>

            <h2 className="descriere-titlu">Descriere</h2>
            <p className="descriere">{carte.descriere}</p>
            <button
              className="btn_adauga_carte"
              onClick={handleAddToCollection}
            >
              Adauga la cartile mele
            </button>
          </div>
        </div>

        <div className="recenzii-block">
          <div className="titlu_recenzii">
            <h1 className="titlu_block_recenzii">Recenziile comunității </h1>
            <button className="btn_recenzii" onClick={openModal}>
              Lasă o recenzie
            </button>
          </div>

          {recenzii.map((recenzie) => (
            <div className="recenzii_card" key={recenzie.id_recenzie}>
              <div className="title_stars">
                <div className="delimitare">
                  <h1 className="title_recenzii_card">Recenzie</h1>
                  <div className="stele">
                    {[...Array(5)].map((star, index) => {
                      const currentRating = index + 1;
                      return (
                        <FaStar
                          key={index}
                          className="star"
                          size={25}
                          color={
                            currentRating <= (hover || recenzie.rating)
                              ? "#FECB1C"
                              : "#e4e5e9"
                          }
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      );
                    })}
                  </div>
                </div>

                <h2 className="autor_recenzii_card">
                  By {recenzie.nume_utilizator}
                </h2>
                <p className="text_recenzii_card">{recenzie.text_recenzie}</p>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
        <div className="footer"></div>
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal} id={id} />
    </div>
  );
}
