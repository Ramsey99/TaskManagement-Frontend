import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.clear();
    navigate("/users");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
      <Link className="navbar-brand font-weight-bold" to="/">
        <i className="fas fa-tasks mr-2"></i>TaskApp
      </Link>

      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto align-items-center">
          {token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/tasks">
                  <i className="fas fa-list mr-1"></i> Tasks
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="/#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={
                      user?.profile_pic
                        ? user.profile_pic
                        : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt="Profile"
                    className="rounded-circle mr-2"
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                    }}
                  />
                  <span className="text-light">{user?.name || "User"}</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <i className="fas fa-user-circle mr-1"></i> Login / Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
