import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// JSX imports

// CSS
import "../css/HomePage.css";

function HomePage() {
  return (
    <>
      <div className="gradient">
        {/* SIDE COLUMNS */}
        {/* <div className="gradient-overlay-left"></div>
        <div className="gradient-overlay-right"></div> */}
        <div className="heading-container">
          <h2>Harmonize</h2>
        </div>
        <div className="carousel-container">
          <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://img.freepik.com/premium-photo/multiracial-friends-playing-music-beach-party_99043-1521.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h2>Harmonize</h2>
                  <img
                    src="../src/assets/harmonize-logo-transparent.png"
                    id="slide1-logo"
                  ></img>
                  <p>The best way to connect.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://media.istockphoto.com/id/1162129419/photo/cheerful-woman-having-fun-with-her-friends-on-a-music-concert-by-night.jpg?s=612x612&w=0&k=20&c=Y5TbNWVgtxKVTUnvX61nU4cKLxAi1au0RSVCjj7NA2c="
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Join a Room!</h5>
                  <Link
                    to="/join"
                    className="btn btn-primary"
                    id="carousel-btn"
                  >
                    Join
                  </Link>
                  <p>Click here to enter a room code!</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://i.pinimg.com/564x/79/cf/09/79cf09360f949d295a0132f36c46dd1e.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Create a Room</h5>
                  <Link
                    to="/create"
                    className="btn btn-primary"
                    id="carousel-btn"
                  >
                    Join
                  </Link>
                  <p>Click here to create a room for you and your friends!</p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
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
              data-bs-target="#carouselExampleCaptions"
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
    </>
  );
}

export default HomePage;
