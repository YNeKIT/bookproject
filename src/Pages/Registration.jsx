import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import "./Registration.css";

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      if (!username || !email || !password) {
        setError("Nu sunt completate toate spatiile");
        return;
      }

      if (username.length < 4 || email.length < 4 || password.length < 4) {
        setError("Lungimea trebuie sa fie de min 4 caractere");
        return;
      }

      const response = await axios.post("http://127.0.0.1:5000/register", {
        username,
        email,
        password,
      });

      console.log(response.data.message);

      navigate("/Login");
    } catch (err) {
      setError("Eroare la inregistrare");
      console.error("Registration failed", err);
    }
  };

  return (
    <div>
      <NavBar username={username} />
      <div className="mainReg">
        <div className="containerReg">
          <h1 className="titlureg">Înregistrează-te pe BOOKCLUB</h1>
          <div>
            <label>Username:</label>
            <input
              className="input_reg"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              className="input_reg"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              className="input_reg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="reg_btn" onClick={handleRegister}>
              Register
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Registration;
