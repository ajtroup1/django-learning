import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/JoinRoom.css";

function JoinRoom() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomFound, setRoomFound] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    // Fetch room details or perform any other initialization based on roomCode
    fetchRooms();
  }, []); // Trigger useEffect whenever roomCode changes

  // Function to handle change in votes input
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleJoin = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: code
      })
    }

    fetch("http://127.0.0.1:8000/api/joinroom", requestOptions).then((response) => {
      if(response.ok) {
        navigate(`/room/${code}`)
      }
      else {
        alert('Could not join room.')
      }
    });
  };


  // Function to fetch room details based on roomCode
  const fetchRooms = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/rooms");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <>
      <div className="gradient-join">
        <div className="heading-container">
          <h1>Join a Room!</h1>
          <div className="join-form">
            <form>
              <div
                className="mb-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ textAlign: "center" }}>
                  <label htmlFor="code" className="form-label">
                    Code:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="code"
                    aria-describedby="code"
                    value={code}
                    onChange={handleCodeChange}
                    style={{ textAlign: "center" }}
                    autoComplete="off"
                  />
                </div>
              </div>
              {/* <div
                className="mb-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ textAlign: "center" }}>
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="name"
                    style={{ textAlign: "center" }}
                  />
                </div>
              </div> */}
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "130px" }}
                onClick={handleJoin}
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinRoom;
