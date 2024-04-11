import React, { Component } from "react";
import "../css/Room.css";
import CreateRoomPage from "./CreateRoomPage.js";
import WhiteBack from "../assets/white-background.jpg";
import Play from "../assets/play.png";
import Pause from "../assets/pause.png";
import Forward from "../assets/forward.png";
import Back from "../assets/back.png";
import LinearProgress from "@mui/material/LinearProgress";

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
      device: {},
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
    this.getCurrentSong = this.getCurrentSong.bind(this);
    this.rewindSong = this.rewindSong.bind(this);
    this.getCurrentDevice = this.getCurrentDevice.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.getRoomDetails();
  }

  componentDidMount() {
    this.songInterval = setInterval(this.getCurrentSong, 1000);
    this.deviceInterval = setInterval(this.getCurrentDevice, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.songInterval);
    clearInterval(this.deviceInterval);
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
      });
  }

  getCurrentDevice() {
    fetch("/spotify/get-device")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({ device: data });
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching device:", error);
      });
  }

  setVolume(direction) {
    let vol;
    if (direction === "increase") {
      if (this.state.device.volume_percent < 76) {
        vol = this.state.device.volume_percent + 25;
      } else {
        vol = 100;
      }
    } else if (direction === "decrease") {
      if (this.state.device.volume_percent > 24) {
        vol = this.state.device.volume_percent - 25;
      } else {
        vol = 0;
      }
    }
    console.log(
      "current vol is ",
      this.state.device.volume_percent,
      ", ",
      direction,
      "ing to ",
      vol
    );
    this.changeVolume(vol);
  }

  changeVolume(vol) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/set-volume/" + vol, requestOptions);
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

  pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  }

  playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  }

  skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  }
  rewindSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/rewind", requestOptions);
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
  const songProgress = (this.state.song.time / this.state.song.duration) * 100;
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
        <div>
          <p>___________________________________________</p>
          <LinearProgress variant="determinate" value={songProgress} />
        </div>
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
              <img
                src={Back}
                id="back-btn"
                onClick={() => this.rewindSong()}
              />
              {this.state.song.is_playing ? (
                <img
                  src={Pause}
                  id="play-btn"
                  onClick={() => this.pauseSong()}
                />
              ) : (
                <img
                  src={Play}
                  id="play-btn"
                  onClick={() => this.playSong()}
                />
              )}
              <img
                src={Forward}
                id="play-btn"
                onClick={() => this.skipSong()}
              />
            </>
          )}
        </div>
        {this.state.isHost && (
          <div className="volume-container">
            <p>
              ____________________
              <LinearProgress
                variant="determinate"
                value={this.state.device.volume_percent}
              />
            </p>
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "50px",
              }}
            >
              <button
                className="btn btn-success"
                style={{ marginRight: "10px" }}
                onClick={() => this.setVolume("increase")}
              >
                +
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.setVolume("decrease")}
              >
                -
              </button>
            </div>
          </div>
        )}
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
