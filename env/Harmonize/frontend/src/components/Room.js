import React, { Component } from "react";
import "../css/Room.css";
import CreateRoomPage from "./CreateRoomPage.js";
import WhiteBack from "../assets/white-background.jpg";
import Play from "../assets/play.png";
import Pause from "../assets/pause.png";
import Forward from "../assets/forward.png";
import Back from "../assets/back.png";

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
    this.getCurrentSong = this.getCurrentSong.bind(this);
    this.getRoomDetails();
  }

  componentDidMount() {
    this.interval = setInterval(this.getCurrentSong, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
        this.setState({ song: data });
        console.log(data);
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
          style={{ marginLeft: "30px" }}
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
          <h2 className="room-code">Code: {this.roomCode}</h2>
        </div>
        <div className="info-container">
          <div className="album-container">
            <img src={this.state.song.image_url} id="album-cover" />
          </div>
          <h2 style={{ marginTop: "10px" }}>{this.state.song.title}</h2>
          <h5>{this.state.song.artist}</h5>
        </div>
        <div className="music-container">
          {this.state.isHost ? this.renderSettingsButton() : null}
          <div className="items-box">
            {this.state.isHost && (
              <img src={WhiteBack} id="harmonize-bar-logo" />
            )}
          </div>
          <div className="music-actions">
            {this.state.isHost && (
              <>
                <img src={Back} id="play-btn" />
                {this.state.song.is_playing ? (
                  <img src={Pause} id="play-btn" />
                ) : (
                  <img src={Play} id="play-btn" />
                )}
                <img src={Forward} id="play-btn" />
              </>
            )}
          </div>
          <button
            className="btn btn-danger"
            onClick={this.leaveButtonPressed}
            style={{ marginRight: "30px" }}
          >
            Leave
          </button>
        </div>
      </div>
    );
  }
}
