import "../styles/editPassword.css";
import { useState } from "react";
import { actualizarContrasena } from "../services/sistemaController";

export function EditPassword({ onClose }) {
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [repiteNuevaContrasena, setRepiteNuevaContrasena] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nuevaContrasena !== repiteNuevaContrasena) {
      alert("⚠️ Las nuevas contraseñas no coinciden");
      return;
    }
    try {
      const data = await actualizarContrasena(
        contrasenaActual,
        nuevaContrasena
      );
      alert(data.message);
      console.log(data.message);
      onClose();
    } catch (err) {
      alert("Error: " + err.message);
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="password-container">
      <div className="password-card">
        <button onClick={onClose} className="close">
          X
        </button>
        <h1>🔐Cambiar Contraseña</h1>
        <form onSubmit={handleSubmit}>
          <label>Contraseña actual</label>
          <input
            type="text"
            required
            placeholder="Ingresa tu contraseña actual"
            value={contrasenaActual}
            onChange={(e) => setContrasenaActual(e.target.value)}
          />
          <label>Nueva contraseña</label>
          <input
            type="text"
            required
            placeholder="Ingresa tu nueva contraseña"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
          />
          <label>Confirmar nueva contraseña</label>
          <input
            type="text"
            required
            placeholder="Confirma tu nueva contraseña"
            value={repiteNuevaContrasena}
            onChange={(e) => setRepiteNuevaContrasena(e.target.value)}
          />
          <button className="savePassword">Cambiar contraseña</button>
        </form>
      </div>
    </div>
  );
}
