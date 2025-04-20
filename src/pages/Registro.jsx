import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles.css";

const Registro = ({ openLogin, setUser }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/registrar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: formData.nombre,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al registrar.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.usuario));
      setUser(data.usuario);
      setError("");
      setSuccess(true);

      setTimeout(() => {
        navigate("/cuenta");
      }, 1000);
    } catch (err) {
      setError("Error del servidor.");
    }
  };

  return (
    <div className="registro-container">
      <h2>Regístrate</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre completo</label>
        <input type="text" name="nombre" onChange={handleChange} required />

        <label>Correo electrónico</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Contraseña</label>
        <input type="password" name="password" onChange={handleChange} required />

        <label>Confirmar contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          required
        />

        <button type="submit">Registrarse</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">¡Registro realizado con éxito!</p>}
      </form>

      <p>
        ¿Ya tienes cuenta?{" "}
        <Link to="#" onClick={openLogin}>
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default Registro;



