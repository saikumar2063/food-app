import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

function Navbar() {
  let data = useCart();
  const [cartView, setCartVie] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("./login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            <img
              src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-munch-img.png"
              className="food-munch-logo"
              alt="logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("userEmail") ? (
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myOrder"
                >
                  My Orders
                </Link>
              ) : (
                ""
              )}
            </ul>

            <div className="d-flex">
              {!localStorage.getItem("userEmail") ? (
                <div className="d-flex">
                  <Link className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>

                  <Link
                    className="btn bg-white text-success mx-1"
                    to="/createuser"
                  >
                    SignUp
                  </Link>
                </div>
              ) : (
                <div>
                  <div
                    className="btn bg-white text-success mx-2"
                    onClick={() => setCartVie(true)}
                  >
                    My cart{" "}
                    <Badge pill bg="danger">
                      {data.length}
                    </Badge>
                  </div>
                  {cartView ? (
                    <Modal onClose={() => setCartVie(false)}>
                      <Cart />
                    </Modal>
                  ) : null}
                  <div
                    className="btn bg-white text-danger mx-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
