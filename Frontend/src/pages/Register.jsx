import { useState } from "react";
import "../styles/index.css";
import "../styles/register.css";
import { registrarUsuario } from "../services/sistemaController";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [genero, setGenero] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const datosUsuario = {
      nombres,
      apellidos,
      fechaNac,
      genero,
      correo,
      contrasena,
    };

    try {
      const mensaje = await registrarUsuario(datosUsuario);
      alert(mensaje);
      navigate("/login");
    } catch (err) {
      alert(err.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="space">
      <div className="stars">
        <div id="register-box">
          <h1 className="title-register">🚀 REGISTRO ELEKTRASPACE</h1>
          <form onSubmit={handleRegister}>
            <label>Nombres</label>
            <input
              className="input-register"
              required
              placeholder="Ingresa tus nombres"
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />

            <label>Apellidos</label>
            <input
              className="input-register"
              required
              placeholder="Ingresa tus apellidos"
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />

            <label>Fecha de nacimiento</label>
            <input
              className="input-register"
              required
              type="date"
              value={fechaNac}
              onChange={(e) => setFechaNac(e.target.value)}
            />

            <label>Género</label>
            <select
              className="select"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="">Selecciona...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>

            <label>Correo Electrónico</label>
            <input
              className="input-register"
              required
              placeholder="Ingresa tu correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <label>Contraseña</label>
            <input
              className="input-register"
              required
              placeholder="Ingresa tu contraseña"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <button type="submit" className="button-register">
              🌌 Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
