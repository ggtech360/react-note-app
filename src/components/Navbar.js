import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let history = useNavigate();

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          GNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("auth-token") ? (
            <div className="d-flex align-items-center gap-3 mx-3">
              <Link className="btn btn-outline-info" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-info" to="/signup">
                SignUp
              </Link>
            </div>
          ) : (
            <div className="d-flex gap-3 align-items-center mx-3">
              <h5 className="text-light text-center">
                Hello, {localStorage.getItem("username")}
              </h5>
              <button
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  localStorage.removeItem("username");
                  history("/login");
                }}
                className="btn btn-outline-info"
              >
                LogOut
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
