import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const Formulario = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    nacimiento: "",
    persona: "",
    fechaImportante: "",
    deseos: "",
  });

  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generarNumeros = async (e) => {
    e.preventDefault();
    setEnviando(true);
  
    const payload = {
      nombre: formData.nombre,
      nacimiento: formData.nacimiento,
      personaQuerida: formData.persona,
      fechaImportante: formData.fechaImportante,
      deseos: formData.deseos
        // 🚫 No mandes numerosPrincipales ni numerosComplementarios
            };


    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pago/crear-preferencia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

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

    //formulariogit
  return (
    <div className="formulario-container">
      <div className="info-signos">
        <h2>Antes de descubrir tus números, necesitamos conocer algunos aspectos clave de tu vida:</h2>
        <ul>
          <li>📅Tu fecha de nacimiento: Nos ayuda a entender tus patrones energéticos.</li> <br />
          <li>💖El nombre de una persona querida: Puede ser alguien que ames o hayas amado.</li> <br />
          <li>📆Una fecha importante en tu vida: Ayuda a ver los ciclos que guían tu historia.</li> <br />
          <li>🌠Tus deseos más profundos: Aquello que anhelas en tu interior. Nos da dirección.</li> <br />
        </ul>
      </div>

      <form className="formulario-box" onSubmit={generarNumeros}>
        <label htmlFor="nombre">Nombre completo:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <label htmlFor="nacimiento">Fecha de nacimiento:</label>
        <input
          type="date"
          id="nacimiento"
          name="nacimiento"
          value={formData.nacimiento}
          onChange={handleChange}
          required
        />

        <label htmlFor="persona">Nombre de una persona querida:</label>
        <input
          type="text"
          id="persona"
          name="persona"
          value={formData.persona}
          onChange={handleChange}
          required
        />

        <label htmlFor="fechaImportante">Una fecha importante:</label>
        <input
          type="date"
          id="fechaImportante"
          name="fechaImportante"
          value={formData.fechaImportante}
          onChange={handleChange}
          required
        />

        <label htmlFor="deseos">Cuéntame tus deseos:</label>
        <textarea
          id="deseos"
          name="deseos"
          rows="4"
          value={formData.deseos}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="btn" disabled={enviando}>
            {enviando ? (<><span className="spinner"></span> Descubriendo tus números...</>) : ("Descubrir mis números")}
        </button>
      </form>
    </div>
  );
};

export default Formulario;


