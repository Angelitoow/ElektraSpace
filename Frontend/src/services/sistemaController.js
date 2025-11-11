import { authService } from "./AuthService.js";
import { ModuloService } from "./ModuloService.js";
import { HistorialAccesoService } from "./HistorialAccesoService.js";

// Registro de usuario
export async function registrarUsuario(datosUsuario) {
  return authService.registrarUsuario(datosUsuario);
}

// Login de usuario
export async function autenticarUsuario({ correo, contrasena }) {
  return authService.autenticarUsuario({ correo, contrasena });
}
// Traer todos los módulos
export async function obtenerModulos() {
  return ModuloService.obtenerModulos();
}
// Actualizar tema del usuario
export async function actualizarTema(temaVisual) {
  return authService.actualizarTema(temaVisual);
}

// Actualizar contraseña del usuario
export async function actualizarContrasena(contrasenaActual, nuevaContrasena) {
  return authService.actualizarContrasena(
    contrasenaActual,
    nuevaContrasena
  );
}

// Registrar ingreso a un módulo
export async function registrarIngresoModulo(idModulo) {
  return HistorialAccesoService.registrarIngresoModulo(idModulo);
}

// Registrar salida de un módulo
export async function registrarSalidaModulo(idHistorial) {
  return HistorialAccesoService.registrarSalidaModulo(idHistorial);
}

// Obtener el último historial de un módulo
export async function obtenerUltimoHistorial(idModulo) {
  return HistorialAccesoService.obtenerUltimoHistorial(idModulo);
}
