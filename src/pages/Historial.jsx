import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const Historial = () => {
  const [lecturas, setLecturas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      fetchHistorial(user.email);
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

  return (
    <div className="historial-container">
      <h2 className="titulo-historial">📚 Historial de Lecturas</h2>

      {lecturas.length === 0 ? (
        <p>No hay lecturas registradas todavía.</p>
      ) : (
        <div className="tarjetas-container">
          {lecturas.map((lectura) => (
            <div key={lectura.id} className="tarjeta-lectura">
              <h3>{lectura.nombre}</h3>
              <p><strong>Números principales:</strong> {lectura.numeros_principales}</p>
              <p><strong>Números complementarios:</strong> {lectura.numeros_complementarios}</p>
              <p className="interpretacion">{lectura.interpretacion}</p>
              <p className="fecha-lectura">📅 {new Date(lectura.fecha_creacion).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      <button className="btn volver-btn" onClick={() => navigate("/cuenta")}>
        Volver a Mi Cuenta
      </button>
    </div>
  );
};

export default Historial;
