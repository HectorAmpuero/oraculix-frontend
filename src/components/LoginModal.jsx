import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const LoginModal = ({ isOpen, onClose, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null; // no mostrar si no está abierto

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const user = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    // guardar sesión activa
    const sesion = { nombre: user.nombre, email: user.email };
    localStorage.setItem("user", JSON.stringify(sesion));
    setUser(sesion); // actualizar estado global

    setError("");
    onClose(); // cerrar modal
    navigate("/cuenta");
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

          <button type="submit">Entrar</button>
          {error && <p className="error">{error}</p>}
        </form>

        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default LoginModal;


