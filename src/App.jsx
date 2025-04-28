import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";
import Registro from "./pages/Registro";
import Resultados from "./pages/Resultados";
import Cuenta from "./pages/Cuenta";
import LoginModal from "./components/LoginModal";
import PrivateRoute from "./components/PrivateRoute";
import PagoExitoso from "./pages/PagoExitoso";
import PagoError from "./pages/PagoError";
import Historial from "./pages/Historial";
import Manifiesto from "./pages/Manifiesto"; // 🆕 Importar Manifiesto

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="app">
      <Navbar
        openLogin={() => setIsLoginOpen(true)}
        user={user}
        setUser={setUser}
        handleLogout={() => {
          localStorage.removeItem("user");
          setUser(null);
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/registro" element={<Registro openLogin={() => setIsLoginOpen(true)} setUser={setUser} />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/pago-error" element={<PagoError />} />
        <Route path="/cuenta" element={<PrivateRoute><Cuenta user={user} /></PrivateRoute>} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/manifiesto" element={<Manifiesto />} /> {/* 🆕 Ruta Manifiesto */}
      </Routes>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} setUser={setUser} />
      <Footer />
    </div>
  );
}

export default App;




