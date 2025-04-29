import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const Historial = () => {
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
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/lectura/${encodeURIComponent(email)}`
      );
      if (!res.ok) {
        throw new Error("La respuesta del servidor no fue exitosa");
      }
      const data = await res.json();
      setLecturas(data);
    } catch (err) {
      console.error("❌ Error al cargar historial:", err);
    }
  };  

  const volverCuenta = () => {
    navigate("/cuenta");
  };

  if (!usuario) {
    return (
      <div className="historial-container">
        <p>Cargando datos de usuario...</p>
      </div>
    );
  }

  return (
    <div className="historial-container">
      <h2 className="titulo-historial">📚 HISTORIAL DE LECTURAS</h2>

      {lecturas.length === 0 ? (
        <p>No hay lecturas registradas todavía.</p>
      ) : (
        lecturas.map((lectura, index) => (
          <div key={index} className="historial-item">
            <p><strong>Nombre:</strong> {lectura.nombre}</p>
            <p><strong>Fecha de creación:</strong> {new Date(lectura.fecha_creacion).toLocaleDateString()}</p>

            <p><strong>Números principales:</strong> {lectura.numeros_principales?.split(", ").map((num, idx) => (
              <span key={idx}>{num} </span>
            ))}</p>

            <p><strong>Números complementarios:</strong> {lectura.numeros_complementarios?.split(", ").map((num, idx) => (
              <span key={idx}>{num} </span>
            ))}</p>

            <p><strong>Interpretación:</strong></p>
            <p>{lectura.interpretacion}</p>

            <hr />
          </div>
        ))
      )}

      <button className="btn" onClick={volverCuenta}>
        Volver a Mi Cuenta
      </button>
    </div>
  );
};

export default Historial;



