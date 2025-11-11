import { API_URL } from "./config.js";

export const HistorialAccesoService = {
  async registrarIngresoModulo(idModulo) {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/historial`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idModulo }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Error al registrar ingreso");

      return data;
    } catch (error) {
      console.error("❌ Error al registrar ingreso:", error);
      throw error;
    }
  },

  async registrarSalidaModulo(idHistorial) {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/historial/salida/${idHistorial}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al registrar salida");

      return data;
    } catch (error) {
      console.error("❌ Error al registrar salida:", error);
      throw error;
    }
  },

  async obtenerUltimoHistorial(idModulo) {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/historial/${idModulo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 404) return null;

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Error al obtener historial");

      return data;
    } catch (error) {
      console.error("❌ Error al obtener historial:", error);
      throw error;
    }
  },
};
