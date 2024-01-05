// Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });

      const { token, nume_utilizator, id_utilizator, id_colectie } =
        response.data;

      localStorage.setItem("token", token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ id_utilizator, nume_utilizator })
      );
      localStorage.setItem("id_colectie", id_colectie);

      navigate("/");

      console.log("Login successful");
    } catch (err) {
      setError("Nume, sau parola incorecte");
      console.error("Login failed", err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="loginContainer">
        <h1 className="loginTitle">Login</h1>
        <div>
          <label>Username:</label>
          <input
            className="loginInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button className="loginButton" onClick={handleLogin}>
            Login
          </button>
        </div>
        {error && <p className="loginError">{error}</p>}
        <Link to={"/Registration"}>
          <p className="inregistrare"> înregistrează-te </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
