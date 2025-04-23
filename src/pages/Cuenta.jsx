import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValorModal from "../components/ValorModal";
import "../assets/styles.css"; 

const Cuenta = () => {
  const [usuario, setUsuario] = useState(null);
  const [lecturas, setLecturas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  // Cambio de ruta corregido para styles.css
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
        `${import.meta.env.VITE_BACKEND_URL}/api/lecturas/${encodeURIComponent(email)}`
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
      <p>📧 Correo: {usuario.email}</p>

      <div className="marco-bienvenida">
        <p>¿Estás listo para descubrir los números que guían tu vida?</p>
        <button className="btn" onClick={() => navigate("/formulario")}>
          ✨ Comenzar la lectura
        </button>
      </div>

      <p className="frase-motivacional">
        🎧 Tu energía atrae lo que tu alma necesita. Confía en tus números.
      </p>

      <button className="btn" onClick={() => setModalVisible(true)}>
        📖 Ver historial de lecturas
      </button>

      <button className="btn logout" onClick={handleLogout}>
        🔒 Cerrar sesión
      </button>

      {/* Modal de Historial */}
      {modalVisible && (
        <ValorModal onClose={() => setModalVisible(false)} titulo="Historial de Lecturas">
          {lecturas.length === 0 ? (
            <p>Aún no has hecho ninguna lectura.</p>
          ) : (
            lecturas.map((lectura, index) => (
              <div className="historial-item" key={index}>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(lectura.fecha_creacion).toLocaleDateString()}
                </p>
                <p>
                  <strong>Números principales:</strong>{" "}
                  {lectura.numeros_principales.join(", ")}
                </p>
                <p>
                  <strong>Complementarios:</strong>{" "}
                  {lectura.numeros_complementarios.join(", ")}
                </p>
                <p>
                  <strong>Interpretación:</strong> {lectura.interpretacion || "No disponible"}
                </p>
                <hr />
              </div>
            ))
          )}
        </ValorModal>
      )}
    </div>
  );
};

export default Cuenta;

