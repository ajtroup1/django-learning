import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
// JSX imports
import HomePage from "./HomePage";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
// CSS
import "../css/App.css";

function App() {
  const [navbarType, setNavbarType] = useState("user");
  const [code, setCode] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/userinroom")
      .then((response) => response.json())
      .then((data) => {
        setCode(code);
        console.log("returned session", data);
      });
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    // Determine navbar type based on current path
    if (currentPath === "/admin") {
      setNavbarType("admin");
    } else if (currentPath === "/") {
      setNavbarType("user");
    }
  }, []); // Run only once on component mount

  return (
    <div className="main-contents">
      <Router>
        {/* NAVBAR */}  
        {navbarType === "user" && (
          <div className="navbar-container">
            <nav className="navbar navbar-light custom-navbar">
              <div className="container-fluid">
                <a href="/">
                  <img
                    src="../src/assets/harmonize-logo-transparent.png"
                    alt=""
                    width="auto"
                    height="35"
                  ></img>
                </a>
                <Link
                  to="/"
                  className="btn btn-outline-primary"
                  id="nav-btn"
                  style={{ width: "100px" }}
                >
                  Home
                </Link>
                <Link
                  to="/join"
                  className="btn btn-outline-primary"
                  id="nav-btn"
                  style={{ width: "100px" }}
                >
                  Join
                </Link>
                <Link
                  to="/create"
                  className="btn btn-outline-primary"
                  id="nav-btn"
                  style={{ width: "100px" }}
                >
                  Create
                </Link>
                <form className="d-flex">
                  <button
                    className="btn btn-outline-primary"
                    type="submit"
                    id="admin-login-button"
                  >
                    Admin
                  </button>
                </form>
              </div>
            </nav>
          </div>
        )}

        {/* MAIN / APP */}
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                code ? (
                  <Navigate to={`/room/${code}`} />
                ) : (
                  <HomePage setCode={setCode} />
                )
              }
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/create" element={<CreateRoom />} />
            <Route path="/room/:roomCode" element={<Room />} />
          </Routes>
        </div>

        {/* FOOTER */}
        <div className="footer-container">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
              <a
                href="/"
                className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
              >
                {/* <svg className="bi" width="30" height="24">
                <use xlinkHref="#bootstrap"></use>
              </svg> */}
                <img
                  src="../src/assets/harmonize-logo-transparent.png"
                  alt="logo"
                  className="bi"
                  id="footer-logo"
                />
              </a>
              <span className="mb-3 mb-md-0 text-body-secondary">
                © 2024 Harmonize, Inc
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
    </div>
  );
}

export default App;
