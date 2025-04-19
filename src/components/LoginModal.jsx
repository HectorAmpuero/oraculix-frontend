import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          nombre: usuarioEncontrado.nombre,
          email: usuarioEncontrado.email,
        })
      );
      setError("");
      onClose();
      navigate("/cuenta");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
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

        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default LoginModal;
