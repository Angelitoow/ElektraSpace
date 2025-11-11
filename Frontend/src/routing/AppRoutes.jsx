import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { Simulation1 } from "../pages/Simulation1.jsx";
import { Simulation2 } from "../pages/Simulation2.jsx";
import { Simulation3 } from "../pages/Simulation3.jsx";
import { Dashboard } from "../pages/Dashboard.jsx";
import { PanelAdmin } from "../pages/PanelAdmin.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { RutaDesconocida } from "./RutaDesconocida.jsx";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute rolPermitido="usuario">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/panelAdmin"
          element={
            <ProtectedRoute rolPermitido="admin">
              <PanelAdmin />
            </ProtectedRoute>
          }
        />

        {/* Rutas adicionales */}
        <Route
          path="/simulation1"
          element={
            <ProtectedRoute rolPermitido="usuario">
              <Simulation1 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/simulation2"
          element={
            <ProtectedRoute
              rolPermitido="usuario"
              simulacionRequerida="simulation1"
            >
              <Simulation2 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/simulation3"
          element={
            <ProtectedRoute
              rolPermitido="usuario"
              simulacionRequerida="simulation2"
            >
              <Simulation3 />
            </ProtectedRoute>
          }
        />

        {/* Captura cualquier ruta no existente */}
        <Route path="*" element={<RutaDesconocida />} />
      </Routes>
    </BrowserRouter>
  );
};
