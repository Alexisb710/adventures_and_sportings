import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";

export function Navbar() {
  const { userCredentials, setUserCredentials } = useContext(AppContext);
  const navigate = useNavigate();

  // Handle user logout
  function handleLogout() {
    localStorage.removeItem("user"); // Clear user data from localStorage
    setUserCredentials(null); // Clear user credentials from context
    navigate("/auth/login"); // Redirect the user to the login page
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/pack.png"
            alt="picture of rope with clip"
            width="30"
            className="me-2"
          />
          Adventures and Sportings
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-dark" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {/* Conditional rendering based on user credentials */}
          {userCredentials?.role === "admin" && (
            <ul className="navbar-nav me-4">
              <li className="nav-item dropdown me-4">
                <a
                  className="nav-link dropdown-toggle text-dark me-4"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Admin
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/users">
                      Users
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={handleLogout}
                      to="/">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          )}
          {userCredentials?.role !== "admin" && userCredentials && (
            <ul className="navbar-nav me-4">
              <li className="nav-item dropdown me-4">
                <a
                  className="nav-link dropdown-toggle text-dark me-4"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Client
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={handleLogout}
                      to="/">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          )}

          {!userCredentials && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="btn btn-outline-primary me-2"
                  to="/auth/register"
                  role="button">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-primary"
                  to="/auth/login"
                  role="button">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <div className="text-center p-4 border-top">
      <img
        src="/pack.png"
        alt="picture of rope with clip"
        width="30"
        className="me-2"
      />
      Adventures and Sportings
    </div>
  );
}
