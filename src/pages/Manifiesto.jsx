import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const numeros = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 27, 28, 29, 30, 33,
    35, 38, 40, 42, 44, 47, 50, 55, 60, 66
  ];

const Manifiesto = () => {
  const navigate = useNavigate();

  return (
    <div className="manifiesto-container">
      {/* Fondo flotante de números */}
      <div className="numeros-flotando">
      {numeros.map((numero, index) => (
            <span
                key={index}
                className="numero-flotante"
                style={{
                    top: `${Math.random() * 90}%`,
                    left: `${Math.random() * 90}%`,
                    fontSize: `${Math.random() * 2 + 0.8}rem`,
                    animationDuration: `${Math.random() * 5 + 5}s`,
            }}
        >
            {numero}
        </span>
            ))}
      </div>

      {/* Contenido principal */}
      <div className="manifiesto-content">
        <h1>Manifiesto Oraculix</h1>
        <p>Todos tenemos números que se repiten en nuestra vida.<br />
        Fechas, cifras, coincidencias que parecen más que casualidad.</p>

        <p>En Oraculix creemos que esos números pueden tener un significado.<br />
        No para predecir el futuro, sino para ayudarte a elegir con más confianza.</p>

        <p>Por eso creamos esta app: para que descubras tus números personales y los uses en lo que quieras.<br />
        Sí, incluso en tus juegos de la suerte.</p>

        <p>Porque al final, cuando conoces tus números, algo cambia.<br />
        Y quizás, con ellos, también cambie tu destino.</p>

        <p><strong>Oraculix. Tus números. Tu camino. Tu suerte.</strong></p>

        <button className="btn" onClick={() => navigate("/")}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Manifiesto;