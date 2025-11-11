import { Navigate } from "react-router-dom";

export function RutaDesconocida() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/" replace />; // no logueado → login
  }

  if (usuario.rol === "admin") {
    return <Navigate to="/panelAdmin" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}
