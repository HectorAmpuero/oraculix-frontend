import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../assets/styles.css";

const Cuenta = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [lecturas, setLecturas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/"); // redirige si no está logueado
      return;
    }

    const userParsed = JSON.parse(userData);
    setUsuario(userParsed);

    fetchHistorial(userParsed.email);
  }, []);

  const fetchHistorial = async (email) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lecturas/${email}`);
      const data = await res.json();
      setLecturas(data);
    } catch (err) {
      console.error("❌ Error al cargar historial:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
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
      <h2>👤 Bienvenido, {usuario.nombre || "Usuario"}!</h2>
      <p>📧 Correo: {usuario.email}</p>

      <div className="mensaje-bienvenida">
        <p>¿Estás listo para descubrir los números que guían tu vida?</p>
        <button className="btn" onClick={() => navigate("/formulario")}>
          ✨ Comenzar la lectura
        </button>
      </div>

      <div className="frase-motivacional">
        <p>💫 Tu energía atrae lo que tu alma necesita. Confía en tus números.</p>
      </div>

      <button className="btn" onClick={() => setModalVisible(true)}>
        📖 Ver historial de lecturas
      </button>

      <button className="btn logout" onClick={handleLogout}>
        🔒 Cerrar sesión
      </button>

      {/* Modal de Historial */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setModalVisible(false)}>✖</button>
            <h3>📜 Tus lecturas anteriores</h3>
            {lecturas.length === 0 ? (
              <p>No tienes lecturas previas.</p>
            ) : (
              lecturas.map((lectura, index) => (
                <div key={index} className="historial-item">
                  <p><strong>Fecha:</strong> {new Date(lectura.fecha_creacion).toLocaleDateString()}</p>
                  <p><strong>Números principales:</strong> {lectura.numeros_principales.join(", ")}</p>
                  <p><strong>Números complementarios:</strong> {lectura.numeros_complementarios.join(", ")}</p>
                  <p><strong>Interpretación:</strong> {lectura.interpretacion || "No disponible"}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cuenta;
