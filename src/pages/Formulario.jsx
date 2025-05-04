import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const Formulario = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    nacimiento: "",
    persona: "",
    fechaImportante: "",
    deseos: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [bloqueado, setBloqueado] = useState(false); // Modal místico
  const [mensajeBloqueo, setMensajeBloqueo] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generarNumeros = async (e) => {
    e.preventDefault();
    setEnviando(true);

    if (!user) {
      alert("Debes iniciar sesión para continuar.");
      setEnviando(false);
      return;
    }

    const payload = {
      nombre: formData.nombre,
      nacimiento: formData.nacimiento,
      personaQuerida: formData.persona,
      fechaImportante: formData.fechaImportante,
      deseos: formData.deseos,
      email: user.email,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pago/crear-preferencia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 403) {
        setBloqueado(true);
        setMensajeBloqueo(data.error || "No puedes hacer otra lectura por ahora.");
        setEnviando(false);
        return;
      }      

      if (data.id) {
        window.location.href = `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=${data.id}`;
      } else {
        alert("Hubo un error al enviar la info a pago.");
      }
    } catch (error) {
      console.error("Error en el envío:", error);
      alert("Ocurrió un error inesperado.");
    }

    setEnviando(false);
  };

  return (
    <div className="formulario-container">
      <div className="info-signos">
        <h2>Antes de descubrir tus números, necesitamos conocer algunos aspectos clave de tu vida:</h2>
        <ul className="info-signos-list">
          <li><i className="fas fa-gem"></i> Tu fecha de nacimiento: Identifica tu esencia.</li>
          <li><i className="fas fa-heart"></i> Persona querida: Conexiones emocionales.</li>
          <li><i className="fas fa-calendar-alt"></i> Fecha importante: Momentos que marcan tu camino.</li>
          <li><i className="fas fa-star"></i> Deseos: Dan forma a tu energía actual.</li>
        </ul>
      </div>

      <form className="formulario-box" onSubmit={generarNumeros}>
        <label htmlFor="nombre">Nombre completo:</label>
        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label htmlFor="nacimiento">Fecha de nacimiento:</label>
        <input type="date" id="nacimiento" name="nacimiento" value={formData.nacimiento} onChange={handleChange} required />

        <label htmlFor="persona">Nombre de una persona querida:</label>
        <input type="text" id="persona" name="persona" value={formData.persona} onChange={handleChange} required />

        <label htmlFor="fechaImportante">Una fecha importante:</label>
        <input type="date" id="fechaImportante" name="fechaImportante" value={formData.fechaImportante} onChange={handleChange} required />

        <label htmlFor="deseos">Cuéntame tus deseos:</label>
        <textarea id="deseos" name="deseos" rows="4" value={formData.deseos} onChange={handleChange} required></textarea>

        <button type="submit" className="btn" disabled={enviando}>
          {enviando ? (<><span className="spinner"></span> Descubriendo tus números...</>) : ("Descubrir mis números")}
        </button>
      </form>

      {/* Modal Místico */}
      {bloqueado && (
        <div className="modal-registro-overlay">
          <div className="modal-registro">
            <h3>Aún no es tiempo de volver...</h3>
            <p>{mensajeBloqueo}</p>
            <button className="btn" onClick={() => setBloqueado(false)}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formulario;






