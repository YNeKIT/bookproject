// Modal.js

import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

const Modal = ({ isOpen, closeModal, id }) => {
  const [reviewText, setReviewText] = useState("");

  const handleInputChange = (event) => {
    setReviewText(event.target.value);
  };

  const addReview = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const id_utilizator = userInfo.id_utilizator;
    const id_carte = id; // assuming 'id' is the book id

    try {
      await axios.post("http://127.0.0.1:5000/add_review", {
        id_carte,
        id_utilizator,
        text_recenzie: reviewText,
      });

      closeModal();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="close_title">
          <h2 className="modal-title">Lasa o recenzie</h2>
          <button className="close-button" onClick={closeModal}>
            x
          </button>
        </div>

        <input
          className="review-input"
          type="text"
          placeholder="Scrie recenzia aici..."
          value={reviewText}
          onChange={handleInputChange}
        />
        <button className="add-review-btn" onClick={addReview}>
          Adauga
        </button>
      </div>
    </div>
  );
};

export default Modal;
