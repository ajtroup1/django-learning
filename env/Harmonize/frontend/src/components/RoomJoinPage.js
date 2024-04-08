import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/RoomJoinPage.css";

function RoomJoinPage(props) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
    setError(""); // Clearing error message when user types
  };

  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          props.history.push(`/room/${roomCode}`);
        } else {
          setError("Room not found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="gradient-join">
      <div className="heading-container">
        <h1>Join a Room!</h1>
        <div className="join-form">
          <div style={{ textAlign: "center" }}>
            <input
              type="text"
              placeholder="Enter a Room Code"
              value={roomCode}
              onChange={handleTextFieldChange}
              className="form-control"
              style={{ textAlign: "center", marginBottom: "10px" }}
              autoComplete="off"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              onClick={roomButtonPressed}
              className="btn btn-primary"
              style={{ width: "130px", marginBottom: "10px" }}
            >
              Enter Room
            </button>
            <br />
            <Link to="/">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomJoinPage;
