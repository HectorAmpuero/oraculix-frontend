import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-fondo.png";

const Navbar = ({ openLogin }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // Escucha cambios en el localStorage
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(); // O puedes usar navegación programática si lo prefieres
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
