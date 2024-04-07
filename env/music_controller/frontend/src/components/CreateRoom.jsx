import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreateRoom.css";

function CreateRoom() {
  const navigate = useNavigate();
  const [votes, setVotes] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);

  // HANDLING
  // Function to handle change in votes input
  const handleVotesChange = (event) => {
    setVotes(event.target.value);
  };

  // Function to handle change in guest can pause checkbox
  const handleGuestCanPauseChange = (event) => {
    setGuestCanPause(event.target.checked);
  };

  // Create Room button is pressed
  const handleCreate = () => {
    const data = {
      votes_to_skip: votes,
      guest_can_pause: guestCanPause,
    };
    postRoom(data);
  };

  // API
  // Post Room
  const postRoom = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://127.0.0.1:8000/api/createroom", requestOptions).then(
      (response) => response.json()
    ).then((data) => {
      navigate(`/room/${data.code}`)
    })
  };

  return (
    <>
      <div className="gradient-create">
        <div className="heading-container">
          <h1>Create a Room!</h1>
          <div className="join-form">
            <form>
              <div
                className="mb-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ textAlign: "center" }}>
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Votes to skip a song:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={votes}
                    onChange={handleVotesChange}
                    style={{ textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  value={guestCanPause}
                  onChange={handleGuestCanPauseChange}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Guests can pause the music
                </label>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "130px" }}
                onClick={handleCreate}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateRoom;
