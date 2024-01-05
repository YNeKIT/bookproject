// Modal.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Modal.css";

const ModalFriends = ({ isOpen, closeModal, userId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (isOpen && searchQuery.trim() !== "") {
      axios
        .get(`http://127.0.0.1:5000/api/users?search=${searchQuery}`)
        .then((response) => {
          setUsers(response.data.users);
          console.log(response.data.users);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    } else {
      setUsers([]);
    }
  }, [isOpen, searchQuery]);

  const handleSendFriendRequest = () => {
    if (selectedUser) {
      const requestData = {
        user_id: userId,
        friend_id: selectedUser.id,
      };
      console.log("Request Data:", requestData);
      axios
        .post("http://127.0.0.1:5000/api/add-friend", requestData)
        .then((response) => {
          console.log(response.data.message);

          closeModal();
        })
        .catch((error) => {
          console.error("Error sending friend request:", error);
        });
    }
  };
  return (
    <div className={`modal ${isOpen ? "open" : ""}`} onClick={closeModal}>
      <div className="modal-contenta" onClick={(e) => e.stopPropagation()}>
        <h2>Find Friends</h2>
        <input
          className="input_addfriend"
          type="text"
          placeholder="Enter name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul className="friend_block">
          {users.slice(0, 7).map((user) => (
            <li
              className="card_friend"
              key={user.id}
              onClick={() => setSelectedUser(user)}
            >
              <h1 className="user_nick">{user.name}</h1>
              <button
                className="user_addfriend"
                onClick={handleSendFriendRequest}
              >
                Add
              </button>
            </li>
          ))}
        </ul>

        <button className="btn_close_friends" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalFriends;
