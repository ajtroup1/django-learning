import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/CreateRoomPage.css"; // Importing CSS for styling

export default class CreateRoomPage extends Component {
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause,
      votesToSkip: this.props.votesToSkip,
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange() {
    this.setState((prevState) => ({
      guestCanPause: !prevState.guestCanPause,
    }));
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push("/room/" + data.code));
  }

  handleUpdateButtonPressed() {
    const { votesToSkip, guestCanPause, code } = this.state;
    console.log("Updating room with code:", code); // Logging the code being sent
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: this.props.roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error updating room");
        }
      })
      .then((data) => {
        console.log("Updated room code:", data.code); // Logging the updated room code
        alert("Successfully updated room");
        this.props.updateCallback();
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  }

  renderCreateButtons() {
    return (
      <>
          <button
            type="button"
            className="btn btn-primary" // Adding Bootstrap class for styling
            style={{ width: "150px", height: "auto", marginTop: "-20px" }} // Setting width to 150px and height to auto
            onClick={this.handleRoomButtonPressed}
          >
            Create A Room
          </button>
          <Link to="/">
            <button className="btn btn-secondary" style={{ marginTop: "10px" }}>
              Back
            </button>{" "}
            {/* Back button */}
          </Link>
      </>
    );
  }

  renderUpdateButtons() {
    return (
      <>
        <button
          type="button"
          className="btn btn-primary" // Adding Bootstrap class for styling
          style={{ width: "150px", height: "auto" }} // Setting width to 150px and height to auto
          onClick={this.handleUpdateButtonPressed}
        >
          Update Room
        </button>
      </>
    );
  }

  render() {
    const title = this.props.update ? "Update Room" : "Create a Room";
    return (
      <div className="gradient-create">
        {" "}
        {/* Applying gradient */}
        <div className="heading-container d-flex flex-column align-items-center">
          {" "}
          {/* Container for heading */}
          <h1>{title}</h1> {/* Heading */}
          <div className="join-form d-flex flex-column align-items-center">
            {" "}
            {/* Form container */}
            <div
              className="mb-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {" "}
              {/* Form input */}
              <div style={{ textAlign: "center" }}>
                {" "}
                {/* Form input alignment */}
                <label className="form-label">
                  Votes Required To Skip Song:
                </label>{" "}
                {/* Label for input */}
                <input
                  type="number"
                  min="1"
                  className="form-control" // Adding Bootstrap class for styling
                  value={this.state.votesToSkip}
                  onChange={this.handleVotesChange}
                  style={{ textAlign: "center" }}
                />
              </div>
            </div>
            <div className="mb-3 form-check">
              {" "}
              {/* Checkbox container */}
              <div className="mb-3 form-check d-flex justify-content-center" id="check-box">
                <div className="mb-3 form-check">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={this.state.guestCanPause}
                      onChange={this.handleGuestCanPauseChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                      style={{ textAlign: "center" }} // Center align the label text
                    >
                      Guests can pause
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {this.props.update
              ? this.renderUpdateButtons()
              : this.renderCreateButtons()}
          </div>
        </div>
      </div>
    );
  }
}
