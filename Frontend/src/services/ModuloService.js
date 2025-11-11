import { API_URL } from "./config.js";
export const ModuloService = {
  async obtenerModulos() {
    try {
      const res = await fetch(`${API_URL}/modulos`);
      if (!res.ok) throw new Error("Error al obtener módulos");
      return await res.json();
    } catch (error) {
      console.error("❌ Error en obtenerModulos:", error);
      throw error;
    }
  },
};
