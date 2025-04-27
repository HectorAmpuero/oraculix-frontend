import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PagoExitoso = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const procesarPagoExitoso = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const preferenceId = urlParams.get("preference_id");

        if (!preferenceId) {
          alert("No se encontró la referencia del pago.");
          return navigate("/");
        }

        console.log("🔍 Buscando lectura para preference_id:", preferenceId);

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lectura/preference/${preferenceId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "No se encontró la lectura asociada.");
        }

        // Guardamos en localStorage
        localStorage.setItem("lecturaNumerologica", JSON.stringify(data.lectura));
        localStorage.setItem("resultadoNumerologico", JSON.stringify({
          principales: data.lectura.numeros_principales.split(", "),
          complementarios: data.lectura.numeros_complementarios.split(", ")
        }));
        localStorage.setItem("interpretacionNumerologica", data.lectura.interpretacion);

        navigate("/resultados");
      } catch (error) {
        console.error("❌ Error al procesar el pago exitoso:", error);
      }
    };

    procesarPagoExitoso();
  }, [navigate]);

  return (
    <div className="resultados-container">
      <h2>Procesando tu lectura numerológica...</h2>
      <p>Por favor, espera unos segundos mientras generamos tu lectura personalizada.</p>
    </div>
  );
};

export default PagoExitoso;


