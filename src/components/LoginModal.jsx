import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const LoginModal = ({ isOpen, onClose, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.usuario));
      setUser(data.usuario);
      setError("");
      onClose();
      navigate("/cuenta");
    } catch (err) {
      setError("Error del servidor.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Inicia sesión</h2>
        <form className="boxform" onSubmit={handleSubmit}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Iniciar sesión</button>
          {error && <p className="error">{error}</p>}
        </form>

        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default LoginModal;



