import "../styles/theme.css";
import { SwitchToggle } from "../components/SwitchToggle.jsx";
import { actualizarTema } from "../services/sistemaController.js";
import { useState } from "react";

export function Theme({ onClose }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [isLight, setIsLight] = useState(usuario?.temaVisual === 1);

  const handleThemeToggle = async (nuevoTema) => {
    setIsLight(nuevoTema);

    // Aplicar clase al body
    if (nuevoTema) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }

    // Actualizar localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      usuario.temaVisual = nuevoTema ? 1 : 0;
      localStorage.setItem("usuario", JSON.stringify(usuario));
    }

    // Actualizar backend
    try {
      const data = await actualizarTema(nuevoTema ? 1 : 0);
      console.log(data.message);
    } catch (err) {
      console.error("No se pudo actualizar el tema en el backend:", err);
    }
  };

  return (
    <div className="theme-container">
      <div className="theme-card">
        <button onClick={onClose} className="close">
          X
        </button>
        <h1>🎨Cambiar Tema de Página</h1>
        <div className="themes-toggle">
          <span className="dark">🌙</span>
          <SwitchToggle onToggle={handleThemeToggle} initialState={isLight} />
          <span className="light">☀️</span>
        </div>
      </div>
    </div>
  );
}
