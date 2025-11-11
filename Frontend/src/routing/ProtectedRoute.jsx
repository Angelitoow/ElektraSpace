import { Navigate } from "react-router-dom";

export function ProtectedRoute({
  children,
  rolPermitido,
  //simulacionRequerida,
}) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const progreso = JSON.parse(localStorage.getItem("progreso")) || {};

  //  Si no hay sesión
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  //  Si el rol no coincide con el permitido
  if (rolPermitido && usuario.rol !== rolPermitido) {
    // Si es admin intentando entrar a un área de usuario
    if (usuario.rol === "admin") {
      return <Navigate to="/panelAdmin" replace />;
    }
    // Si es usuario intentando entrar al panel admin
    if (usuario.rol === "usuario") {
      return <Navigate to="/dashboard" replace />;
    }
    // Por defecto lo manda al login
    return <Navigate to="/" replace />;
  }

 /* // Si requiere una simulación previa y no la ha completado
  if (simulacionRequerida && !progreso[simulacionRequerida]) {
    return <Navigate to="/dashboard" replace />;
  }*/

  return children;
}
