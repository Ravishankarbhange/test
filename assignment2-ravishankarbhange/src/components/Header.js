import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

  const handleLogout = () =>{
    localStorage.clear();
  }
  const isAuthenticated = localStorage.getItem("authToken") !== null;
  return (
    <div className="header">
      <div className="logo">
          <h1 className="logoName">LensKart</h1>
      </div>
      <div className="nav">
          <ul>
              <Link to="/"><li className="navoption">ProductList</li></Link>
              <Link to="/wishlist"><li className="navoption">Wishlist</li></Link>
              <Link to="/cart"><li className="navoption">Cart</li></Link>
              {isAuthenticated ? (
                <>
                <Link to="/myprofile"> <li className="navoption">Myprofile</li> </Link>
                <Link to="/login" onClick={handleLogout}> <li className="navoption">Logout</li> </Link>
                </>
              ) : (
                <Link to="/login"> <li className="navoption">Login</li> </Link>
              )}
          </ul>
      </div>
    </div>
  )
};

export default Header;
