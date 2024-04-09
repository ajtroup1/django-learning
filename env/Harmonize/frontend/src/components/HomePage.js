import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink,
} from "react-router-dom";
import harmonizeLogo from "../assets/harmonize-logo-transparent.png";
import "../css/HomePage.css";
import RoomJoinPage from "./RoomJoinPage.js";
import CreateRoomPage from "./CreateRoomPage.js";
import Room from "./Room.js";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  renderHomePage() {
    return (
      <div className="main-contents">
        <div className="gradient">
          <h1 className="home-title">Harmonize</h1>
          <div className="carousel-container">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://i.pinimg.com/564x/79/cf/09/79cf09360f949d295a0132f36c46dd1e.jpg"
                    className="d-block w-100"
                    alt="Join a Room"
                  />
                  <div
                    className="carousel-caption d-none d-md-block d-flex flex-column justify-content-center"
                    style={{ paddingTop: "50px" }}
                  >
                    <h5>Harmonize</h5>
                    <p>The best way to connect.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://img.freepik.com/premium-photo/multiracial-friends-playing-music-beach-party_99043-1521.jpg"
                    className="d-block w-100"
                    alt="Join a Room"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Join a Room!</h5>
                    <p>Click here to enter a room code!</p>
                    <div className="oooo" style={{ marginTop: "20px" }}>
                      <Link
                        to="/join"
                        className="btn btn-primary"
                        id="carousel-btn"
                      >
                        Join
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://media.istockphoto.com/id/1162129419/photo/cheerful-woman-having-fun-with-her-friends-on-a-music-concert-by-night.jpg?s=612x612&w=0&k=20&c=Y5TbNWVgtxKVTUnvX61nU4cKLxAi1au0RSVCjj7NA2c="
                    className="d-block w-100"
                    alt="Create a Room"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Create a Room</h5>
                    <p>Click here to create a room for you and your friends!</p>
                    <Link
                      to="/create"
                      className="btn btn-primary"
                      id="carousel-btn"
                    >
                      Create
                    </Link>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div>
              <img src={harmonizeLogo} alt="" id="nav-logo" />
            </div>
            <NavLink className="btn btn-outline-primary me-2" to="/">
              Home
            </NavLink>
            <NavLink className="btn btn-outline-primary me-2" to="/join">
              Join
            </NavLink>
            <NavLink className="btn btn-outline-primary me-2" to="/create">
              Create
            </NavLink>
            <form className="d-flex">
              <NavLink className="btn btn-outline-primary" to="/admin">
                Admin
              </NavLink>
            </form>
          </div>
        </nav>

        <div className="main-contents mt-0">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return this.state.roomCode ? (
                  <Redirect to={`/room/${this.state.roomCode}`} />
                ) : (
                  this.renderHomePage()
                );
              }}
            />
            <Route path="/join" component={RoomJoinPage} />
            <Route path="/create" component={CreateRoomPage} />
            <Route
              path="/room/:roomCode"
              render={(props) => {
                return (
                  <Room {...props} leaveRoomCallback={this.clearRoomCode} />
                );
              }}
            />
          </Switch>
        </div>
        <div className="footer-container">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
              <img src={harmonizeLogo} alt="Harmonize Logo" id="footer-logo" />
              <span className="mb-3 mb-md-0 text-body-secondary">
                © 2024 Company, Inc
              </span>
            </div>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#twitter"></use>
                  </svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#facebook"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </Router>
    );
  }
}
