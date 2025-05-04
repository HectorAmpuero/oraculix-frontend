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

        if (!res.ok || !data.lectura) {
          // Si no hay lectura, probablemente fue bloqueado por los ciclos lunares
          alert("Tu lectura no fue generada. Revisa si ya hiciste una lectura recientemente.");
          return navigate("/formulario");
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
        alert("Ocurrió un problema al procesar tu lectura. Por favor, vuelve a intentarlo.");
        navigate("/formulario");
      }
    };

    procesarPagoExitoso();
  }, [navigate]);

  return (
    <div className="resultados-container">
      <h2>PROCESANDO TU LECTURA NUMEROLÓGICA...</h2>
      <p>Por favor, espera unos segundos mientras generamos tu lectura personalizada.</p>
    </div>
  );
};

export default PagoExitoso;


