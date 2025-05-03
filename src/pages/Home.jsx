import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const Home = () => {
  const navigate = useNavigate();
  const [showModalRegistro, setShowModalRegistro] = useState(false);

  // Función para hacer scroll suave entre slides
  const scrollToSlide = (slideId) => {
    document.getElementById(slideId).scrollIntoView({ behavior: "smooth" });
  };

  // Nuevo: Función para manejar botón "Comenzar mi lectura"
  const handleComenzarLectura = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      navigate("/formulario");
    } else {
      setShowModalRegistro(true);
    }
  };

  return (
    <div className="home">
      {/* Slide 1 */}
      <section id="slide1" className="slide1">
        <h1>Descubre tus números de la suerte <br /> que guían tu destino</h1>
        <p>Nada en la vida es coincidencia. Cada número es un mensaje esperando ser revelado.</p>
        <button className="btn" onClick={() => scrollToSlide("slide2")}>
          Descubre más
        </button>
      </section>

      {/* Slide 2 */}
      <section id="slide2" className="slide2">
        <h2>Los números tienen poder <br />¿Cuál es el tuyo?</h2>
        <div>
          <p className="textp1">
            Desde tiempos antiguos, la numerología ha sido el puente entre lo visible y lo oculto.
          </p>
          <p className="textp2">
            Cada número emite una energía única, influyendo en nuestro destino. Descubre tus números de la suerte que te guían, aquellos que pueden abrir puertas y revelar tu verdadero propósito.
          </p>
          <button className="btn" onClick={() => scrollToSlide("slide3")}>
            Descubrir mis números
          </button>
        </div>
      </section>

      {/* Slide 3 */}
      <section id="slide3" className="slide3">
        <div className="cont2">
          <p>
            <strong>Por solo $1.500 CLP</strong>, obtén una lectura numerológica personalizada basada en tus datos más importantes.
          </p>
          <p className="textp3">
            Cada número tiene un propósito en tu vida... Descubre lo que el universo quiere mostrarte.  
          </p>
          <p className="textp3">
            Una pequeña inversión para un gran descubrimiento
          </p>
          <button className="btn" onClick={handleComenzarLectura}>
            Comenzar mi lectura
          </button>
        </div>
      </section>

      {/* Modal de Registro */}
      {showModalRegistro && (
        <div className="modal-registro-overlay">
          <div className="modal-registro">
            <h3>¡Antes de comenzar tu lectura!</h3>
            <p>Debes registrarte o iniciar sesión para descubrir tus números.</p>
            <div className="modal-buttons">
              <button className="btn" onClick={() => navigate("/registro")}>
                Ir a Registro
              </button>
              <button className="btn cancelar-btn" onClick={() => setShowModalRegistro(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

