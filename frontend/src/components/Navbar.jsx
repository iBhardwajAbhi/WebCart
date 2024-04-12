import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../utils/userContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <div className="navbar">
        <h1 className="nav-left">Ecommerce</h1>
        <div className="nav-right">
          <Link to="/" className="lnk">
            {" "}
            Home
          </Link>
          {!user && (
            <Link to="/login" className="lnk">
              {" "}
              Login
            </Link>
          )}
          {!user && (
            <Link to="/register" className="lnk">
              {" "}
              Register
            </Link>
          )}
          {user && (
            <Link to="/logout" className="lnk">
              {" "}
              Logout ({user.name})
            </Link>
          )}
          {user && (
            <Link to="/orders" className="lnk">
              {" "}
              Orders
            </Link>
          )}

          <Link to="/cart" className="lnk">
            {" "}
            My Cart
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
