import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const Cuenta = () => {
  const [usuario, setUsuario] = useState(null);
  const [lecturas, setLecturas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userParsed = JSON.parse(localStorage.getItem("user"));
    if (userParsed) {
      setUsuario(userParsed);
      fetchHistorial(userParsed.email);
    }
  }, []);

  const fetchHistorial = async (email) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lecturas/${encodeURIComponent(email)}`);
      if (!res.ok) {
        throw new Error("La respuesta del servidor no fue exitosa");
      }
      const data = await res.json();
      setLecturas(data);
    } catch (err) {
      console.error("❌ Error al cargar historial:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  if (!usuario) {
    return (
      <div className="cuenta-container">
        <p>Cargando datos de usuario...</p>
      </div>
    );
  }

  return (
    <div className="cuenta-container">
      <h2 className="titulo-cuenta">👤 BIENVENIDO, {usuario.nombre?.toUpperCase() || "Usuario"}!</h2>
      <p> Correo: {usuario.email}</p>

      <div className="marco-bienvenida">
        <p>¿Estás listo para descubrir los números que guían tu vida?</p>
        <button className="btn" onClick={() => navigate("/formulario")}>
          ✨ Comenzar la lectura
        </button>
      </div>

      <p className="frase-motivacional">
        Tu energía atrae lo que tu alma necesita. Confía en tus números.
      </p>

      <button className="btn" onClick={() => navigate("/historial")}>
        📖 Ver historial de lecturas
      </button>

      <button className="btn logout" onClick={handleLogout}>
        🔒 Cerrar sesión
      </button>
    </div>
  );
};

export default Cuenta;


