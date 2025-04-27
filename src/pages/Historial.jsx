import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Historial = () => {
  const [lecturas, setLecturas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarLecturas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lectura`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error al cargar lecturas");
        }

        setLecturas(data.lecturas);
      } catch (error) {
        console.error("❌ Error al cargar historial:", error);
      }
    };

    cargarLecturas();
  }, []);

  return (
    <div className="historial-container">
      <h2 className="titulo-historial">📚 Historial de Lecturas</h2>

      {lecturas.length === 0 ? (
        <p>No hay lecturas registradas todavía.</p>
      ) : (
        <div className="tarjetas-container">
          {lecturas.map((lectura) => (
            <div className="tarjeta-lectura" key={lectura.id}>
              <h3>{lectura.nombre}</h3>
              <p><strong>Números principales:</strong> {lectura.numeros_principales}</p>
              <p><strong>Números complementarios:</strong> {lectura.numeros_complementarios}</p>
              <p><strong>Interpretación:</strong> {lectura.interpretacion || "Sin interpretación disponible."}</p>
              <p className="fecha-lectura">
                📅 {new Date(lectura.fecha_creacion).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => navigate("/cuenta")} className="btn volver-btn">
        Volver a Mi Cuenta
      </button>
    </div>
  );
};

export default Historial;

