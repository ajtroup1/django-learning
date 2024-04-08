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
      spotifyAuthenticated: false,
      song: {},
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
    this.getRoomDetails();
    this.getCurrentSong();
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
        if (this.state.isHost) {
          this.authenticateSpotify();
        }
      });
  }

  authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ spotifyAuthenticated: data.status });
        console.log(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  getCurrentSong() {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        this.setState({ song: data });
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
        <div className="room-code">
          <h4 className="room-code">Code: {this.roomCode}</h4>
        </div>
        <div className="info-container">
          <div>
            <h6>Votes to skip a song: {this.state.votesToSkip}</h6>
            <h6>Guest Can Pause: {this.state.guestCanPause ? "Yes" : "No"}</h6>
            {this.state.isHost ? <h6>You are the host</h6> : null}
            {this.state.isHost ? this.renderSettingsButton() : null}
            <div>
              <button
                className="btn btn-danger me-2"
                onClick={this.leaveButtonPressed}
                style={{ marginTop: "10px" }}
              >
                Leave Room
              </button>
            </div>
          </div>
        </div>
        <div className="music-container">
          <div className="album-container">
            <img
              src={this.state.song.image_url}
              id="album-cover"
              alt="Album Cover"
            />
          </div>
          <div className="music-info">
            <p>Title: {this.state.song.title}</p>
            <p>Artist: {this.state.song.artist}</p>
          </div>
        </div>
      </div>
    );
  }
}
