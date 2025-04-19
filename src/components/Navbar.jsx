import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-fondo.png";

const Navbar = ({ openLogin }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // Redirigir al home
    window.location.reload(); // Forzar recarga para reflejar el logout
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Oraculix Logo" className="logo" />
      </Link>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/cuenta">Mi cuenta</Link>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/registro">Registro</Link>
            <button onClick={openLogin}>Login</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
