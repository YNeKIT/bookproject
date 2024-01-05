import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../Img/cartelogo.svg";
import ContLogo from "../Img/contul.svg";
import Lupa from "../Img/lupa.svg";
import "./NavBar.css";

function NavBar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user information from local storage
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setUsername(userInfo.nume_utilizator);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/logout");

      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userId");
      localStorage.removeItem("id_colectie");

      console.log("Logout successful");

      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="mainNav">
      <div className="utilits">
        <Link to={"/"}>
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1 className="logotext">BOOKCLUB</h1>
          </div>
        </Link>
        <div className="utilits2">
          <div className="input">
            <input className="inputdes"></input>
            <button className="btninput">
              {" "}
              <img src={Lupa} className="lupa" alt="lupa" />
            </button>
          </div>

          <div className="contlogo">
            <img src={ContLogo} className="contlogoimg" alt="contlogo" />
            <Link to={username ? "/ProfilPage" : "/Login"}>
              <h3 className="conttext">
                {username ? `Bun venit, ${username}` : "CONTUL TĂU"}
              </h3>
            </Link>
            <h3 className="conttext" onClick={handleLogout}>
              LOG OUT
            </h3>
          </div>
        </div>
      </div>

      <div className="green">
        <ul className="menu">
          <Link to={"/"}>
            <li>ACASĂ</li>
          </Link>
          <li>CĂRȚILE MELE</li>
          <li> PRIETENI</li>
          <li>COMUNITATE</li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
