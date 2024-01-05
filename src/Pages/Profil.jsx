import NavBar from "../Components/NavBar";
import Avatar from "../Img/avatar.svg";
import "./Profil.css";
import LogOut from "../Img/logout.svg";
import Footer from "../Components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalFriends from "../Components/ModalFriends";
import Trash from "../Img/trash.svg";
export default function Profil() {
  const [userData, setUserData] = useState(null);
  const userIdData = localStorage.getItem("userInfo");
  const userId = userIdData ? JSON.parse(userIdData).id_utilizator : null;
  const [isModalOpen, setModalOpen] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/profil/${userId}`
      );
      setUserData(response.data);
      console.log("User Data:", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDeleteBook = async (id_carte) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/colectie/delete/${id_carte}`
      );
      console.log(response.data.message);

      // After successful deletion, refresh the user's data
      fetchData();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = async () => {
    setModalOpen(false);
    // Refresh user data after closing the modal
    await fetchData();
  };

  return (
    <div>
      <NavBar />
      <div className="contentbox">
        <div className="left-side">
          <div className="top_container">
            <h1 className="title_profile_box">Bine ai venit in contul tau !</h1>
            <div className="img_container">
              <img className="avatar" src={Avatar} alt="avatar" />
              <div>
                <h2 className="nickname_user">
                  {userData && userData.user && userData.user[1]}
                </h2>
                <img className="logout" src={LogOut} alt="logout" />
              </div>
            </div>
          </div>

          <div className="container_bottom">
            <h1 className="title_container_bottom">Lista de prieteni</h1>

            <ul className="listaprieteni">
              {userData && userData.friends && userData.friends.length > 0 ? (
                userData.friends.map((friend, index) => (
                  <li key={index} className="lista_coloana">
                    <img
                      className="poza_prieten"
                      src={Avatar}
                      alt={`Friend ${index + 1}`}
                    />
                    <h3>{friend[1]}</h3>
                  </li>
                ))
              ) : (
                <li className="lista_coloana">
                  <p className="nu_sunt_prieteni">Nu sunt inca prieteni</p>
                </li>
              )}
            </ul>
            <button className="btn_adauga_prieteni" onClick={openModal}>
              {" "}
              Adauga{" "}
            </button>
          </div>
        </div>

        <div className="right_side">
          <div className="container_left_right">
            <div className="right_left">
              <h1 className="title_right_left">Colecțiile tale de cărți</h1>

              {userData &&
              userData.collection &&
              userData.collection.length > 0 ? (
                userData.collection.map((book, index) => (
                  <div key={index} className="card_right_side">
                    <img
                      src={require(`../carti/` + book[4])}
                      className="carte_colectie"
                      alt={`Book ${index + 1}`}
                    />
                    <h1 className="title_card_colectie">{book[2]}</h1>
                    <h2 className="autor_card_colectie">{book[3]}</h2>
                    <button
                      className="btn_colectie"
                      onClick={() => handleDeleteBook(book[1])}
                    >
                      {" "}
                      <img className="trash" src={Trash} />{" "}
                    </button>
                  </div>
                ))
              ) : (
                <div className="card_right_side">
                  <h1 className="nueste_carte_colectie">
                    {" "}
                    Nu este nici o carte in colectie
                  </h1>
                </div>
              )}

              <div className="btn_container_colectii">
                <button className="btn_next_colectie">Next</button>
                <button className="btn_next_colectie">Prev</button>
              </div>
            </div>

            <div className="right_right">
              <button className="btn_menu">
                Vezi noutățile din comunitate
              </button>
              <button className="btn_menu">
                Caută prieteni cu aceleași interese
              </button>
              <button className="btn_menu">Citește și alte recenzii</button>
            </div>
          </div>

          <div className="right_bottom"></div>
        </div>
      </div>
      <ModalFriends
        isOpen={isModalOpen}
        closeModal={closeModal}
        userId={userId}
      />
      <Footer />
    </div>
  );
}
