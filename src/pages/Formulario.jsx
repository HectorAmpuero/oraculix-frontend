import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/styles.css";

const Formulario = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: "",
    nacimiento: "",
    persona: "",
    fechaImportante: "",
    deseos: "", // <-- nuevo campo
  });

  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const generarNumeros = (cantidad, max) => {
    const numeros = new Set();
    while (numeros.size < cantidad) {
      const numero = Math.floor(Math.random() * max) + 1;
      numeros.add(numero);
    }
    return Array.from(numeros);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const numerosPrincipales = generarNumeros(6, 41);
    const numerosComplementarios = generarNumeros(2, 25);

    const payload = {
      nombre: formulario.nombre,
      nacimiento: formulario.nacimiento,
      personaQuerida: formulario.persona,
      fechaImportante: formulario.fechaImportante,
      deseos: formulario.deseos, // <-- agregado en el payload
      numerosPrincipales,
      numerosComplementarios,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pago/crear-preferencia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data && data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Hubo un error al enviar los datos.");
        setEnviando(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error inesperado.");
      setEnviando(false);
    }
  };

  return (
    <div className="formulario-container">
      <p className="intro">
        Para descubrir tus números, necesitamos conocer algunos aspectos clave de tu vida. ✨
      </p>
      <ul className="bullet-points">
        <li>🔢 Tu fecha de nacimiento: el inicio de tu camino en esta vida.</li>
        <li>💖 El nombre de una persona significativa: alguien que ha marcado tu historia.</li>
        <li>📅 Una fecha que resuene contigo: el momento que dejó huella en tus recuerdos.</li>
        <li>🌱 Tus deseos más profundos: aquello que deseas cultivar en tu interior.</li>
      </ul>

      <form onSubmit={handleSubmit} className="formulario">
        <label htmlFor="nombre">Nombre completo:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />

        <label htmlFor="nacimiento">Fecha de nacimiento:</label>
        <input
          type="date"
          id="nacimiento"
          name="nacimiento"
          value={formulario.nacimiento}
          onChange={handleChange}
          required
        />

        <label htmlFor="persona">Nombre de una persona querida:</label>
        <input
          type="text"
          id="persona"
          name="persona"
          value={formulario.persona}
          onChange={handleChange}
          required
        />

        <label htmlFor="fechaImportante">Una fecha importante:</label>
        <input
          type="date"
          id="fechaImportante"
          name="fechaImportante"
          value={formulario.fechaImportante}
          onChange={handleChange}
          required
        />

        {/* 🌟 CAMPO NUEVO - Deseos */}
        <label htmlFor="deseos">¿Qué deseas manifestar o trabajar?</label>
        <textarea
          id="deseos"
          name="deseos"
          rows="4"
          placeholder="Ej: Amor propio, claridad, abundancia..."
          value={formulario.deseos}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={enviando}>
          {enviando ? "Descubriendo tus números..." : "Descubrir mis números"}
        </button>
      </form>
    </div>
  );
};

export default Formulario;

