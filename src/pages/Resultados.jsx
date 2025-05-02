import React, { useEffect, useState } from "react";
import "../assets/styles.css";

const Resultados = () => {
  const [datos, setDatos] = useState(null);
  const [numeros, setNumeros] = useState(null);
  const [interpretacion, setInterpretacion] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const lecturaRaw = localStorage.getItem("lecturaNumerologica");
      const resultadoRaw = localStorage.getItem("resultadoNumerologico");
      const interpretacionRaw = localStorage.getItem("interpretacionNumerologica");

      if (lecturaRaw && resultadoRaw && interpretacionRaw) {
        const lectura = JSON.parse(lecturaRaw);
        const numeros = JSON.parse(resultadoRaw);

        setDatos(lectura);
        setNumeros(numeros);
        setInterpretacion(interpretacionRaw);
        setTimeout(() => setVisible(true), 500);
      } else {
        throw new Error("Faltan datos en localStorage.");
      }
    } catch (error) {
      console.error("Error al leer desde localStorage:", error);
    }
  }, []);

  if (!datos || !numeros) {
    return (
      <div className="resultados-container">
        <h2>Ups... parece que no has completado tu lectura aún.</h2>
        <p>Por favor, completa el formulario para descubrir tus números.</p>
      </div>
    );
  }

  return (
    <div className={`resultados-container ${visible ? "visible" : "oculto"}`}>
      <h2>Tu lectura numerológica está lista. Estos son tus números:</h2>

      <div className="numeros-section">
        <h3>NÚMEROS PRINCIPALES</h3>
        <div className="numeros">
          {numeros.principales.map((num, index) => (
            <span key={`p-${index}`}>{num}</span>
          ))}
        </div>
      </div>

      <div className="numeros-section">
        <h3>NÚMEROS COMPLEMENTARIOS</h3>
        <div className="numeros">
          {numeros.complementarios.map((num, index) => (
            <span key={`c-${index}`}>{num}</span>
          ))}
        </div>
      </div>

      <div className="interpretacion-box">
        <h3>Tu mensaje personal:</h3>
        <p>{interpretacion}</p>
      </div>

      <div className="mensaje-final">
        <p>Cada uno de estos números vibra con tu energía personal.</p>
        <p>Úsalos como guía, inspiración o simplemente como un impulso hacia lo que deseas.</p>
        <p className="frase">Confía en tus números. Confía en ti.</p>
      </div>
    </div>
  );
};

export default Resultados;
