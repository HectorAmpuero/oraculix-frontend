import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles.css";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No hay usuarios registrados.");
      return;
    }

    if (storedUser.email !== email) {
      setError("El correo ingresado no está registrado.");
      return;
    }

    if (storedUser.password !== password) {
      setError("La contraseña es incorrecta.");
      return;
    }

    // Login exitoso
    setError(null);
    onClose();
    navigate("/cuenta");
    window.location.reload(); // 🔄 Refresca el navbar
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Iniciar sesión</h2>
        <form className="boxform" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar sesión</button>

          {error && <p className="error">{error}</p>}

          <p style={{ marginTop: "10px" }}>
            <Link to="/recuperar-clave">¿Olvidaste tu contraseña?</Link>
          </p>
        </form>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default LoginModal;
