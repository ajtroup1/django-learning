import React, { Component } from "react";
import "../css/Room.css";
import CreateRoomPage from "./CreateRoomPage.js";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.getRoomDetails();
  }

  getRoomDetails() {
    return fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });
  }

  updateShowSettings(value) {
    console.log("Room code:", this.roomCode); // Log the value of roomCode
    this.setState({
      showSettings: value,
    });
  }

  renderSettingsButton() {
    return (
      <div>
        <button
          className="btn btn-secondary"
          onClick={() => this.updateShowSettings(true)}
        >
          Settings
        </button>
      </div>
    );
  }

  renderSettings() {
    return (
      <div className="">
        <CreateRoomPage
          update={true}
          votesToSkip={this.state.votesToSkip}
          guestCanPause={this.state.guestCanPause}
          roomCode={this.roomCode}
          updateCallback={this.getRoomDetails}
        />
        <div className="close-settings">
          <button
            className="btn btn-danger mt-2"
            onClick={() => {
              this.updateShowSettings(false);
            }}
          >
            Close Settings
          </button>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.showSettings) {
      return this.renderSettings();
    }
    return (
      <div className="room-container">
        {" "}
        {/* Add the room-container class */}
        <div className="info-container">
          {" "}
          {/* Add the info-container class */}
          <h4>Code: {this.roomCode}</h4>
          <h6>Votes: {this.state.votesToSkip}</h6>
          <h6>Guest Can Pause: {this.state.guestCanPause ? "Yes" : "No"}</h6>
          {this.state.isHost ? <h6>You are the host</h6> : null}
          {this.state.isHost ? this.renderSettingsButton() : null}
          <div>
            <button
              className="btn btn-danger me-2"
              onClick={this.leaveButtonPressed}
            >
              Leave Room
            </button>
          </div>
        </div>
      </div>
    );
  }
}
