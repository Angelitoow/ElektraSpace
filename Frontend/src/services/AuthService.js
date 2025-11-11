import { API_URL } from "./config.js";

export const authService = {
  async registrarUsuario(datosUsuario) {
    try {
      const res = await fetch(`${API_URL}/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosUsuario),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Error al registrar usuario");
      }
      const data = await res.text();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Login de usuario
  async autenticarUsuario({ correo, contrasena }) {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      if (!res.ok) {
        if (res.status === 401)
          throw new Error("Correo o contraseña incorrectos");
        throw new Error("Error al conectar con el servidor");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async actualizarTema(temaVisual) {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/tema`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ temaVisual }),
      });
      if (!res.ok) throw new Error("Error al actualizar tema");
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Actualizar contraseña del usuario
  async actualizarContrasena(contrasenaActual, nuevaContrasena) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/contrasena`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ contrasenaActual, nuevaContrasena }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al actualizar contraseña");
    }

    return await res.json();
  },
};
