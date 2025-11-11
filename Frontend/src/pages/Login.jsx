import "../styles/index.css";
import "../styles/login.css";
import { useState } from "react";
import { autenticarUsuario } from "../services/sistemaController.js";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await autenticarUsuario({ correo, contrasena });
      console.log("Respuesta del servidor:", res);

      if (res.loggedIn && res.usuario) {
        localStorage.setItem("usuario", JSON.stringify(res.usuario));
        localStorage.setItem("token", res.token);
        alert("✅ Inicio de sesión exitoso");

        if (res.usuario.rol === "admin") {
          navigate("/panelAdmin");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(res.message || "⚠️ Credenciales incorrectas");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space">
      <div className="stars">
        <div id="login-box">
          <h1 className="title">ELEKTRASPACE</h1>
          <h2 className="subtitle">Aventura Educativa Electromagnética</h2>
          <form onSubmit={handleLogin}>
            <label>📧 Correo Electrónico</label>
            <input
              required
              placeholder="Ingresa tu correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <label>🔒 Contraseña</label>
            <input
              required
              placeholder="Ingresa tu contraseña"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />

            <button type="submit" className="button-login">
              🚀 Iniciar Sesión
            </button>
          </form>
          <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
