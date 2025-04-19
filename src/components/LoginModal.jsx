import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const LoginModal = ({ closeLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    localStorage.setItem(
      "user",
      JSON.stringify({ nombre: user.nombre, email: user.email })
    );

    setError("");
    closeLogin(); // cierra el modal
    navigate("/cuenta");
    window.location.reload(); // fuerza recarga para que Navbar se actualice
  };

  return (
    <div className="login-modal">
      <div className="modal-content">
        <h2>Inicia sesión</h2>
        <form onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
};

export default LoginModal;

