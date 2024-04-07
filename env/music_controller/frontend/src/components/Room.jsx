import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Room.css";

function Room(props) {
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const { roomCode } = useParams();
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    fetchRoomDetails(roomCode);
  }, [roomCode]);

  const fetchRoomDetails = async (roomCode) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/rooms");
      const data = await response.json();
      const currentRoom = data.find((room) => room.code === roomCode);
      if (!currentRoom) {
        alert("No room found with that code.");
        navigate("/");
      } else {
        console.log("Room received:", currentRoom);
        setRoom(currentRoom);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleLeave = () => {
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://127.0.0.1:8000/api/leaveroom", postOptions).then((_response) => {
        navigate('/')
    });
  };

  return (
    <div className="room-container">
      {room && (
        <>
          <div className="info-container">
            <h2>Room: {room.code}</h2>
            <p>Votes required to skip a song: {room.votes_to_skip}</p>
            {room.guest_can_pause ? (
              <p>Guests may pause the music</p>
            ) : (
              <p>Guests cannot pause the music</p>
            )}
            {room.guest_can_pause ? (
              <p>You are the host</p>
            ) : (
              <p>You are not the host</p>
            )}
            <button className="btn btn-danger" onClick={handleLeave}>
              Leave Room
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Room;
