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
    <div className="resultados-container">
      <h2>📚 Historial de Lecturas</h2>

      {lecturas.length === 0 ? (
        <p>No hay lecturas registradas todavía.</p>
      ) : (
        <ul>
          {lecturas.map((lectura) => (
            <li key={lectura.id}>
              <strong>{lectura.nombre}</strong> - 
              Números principales: {lectura.numeros_principales} - 
              Fecha: {new Date(lectura.fecha_creacion).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate("/")} className="btn">
        Volver al inicio
      </button>
    </div>
  );
};

export default Historial;
