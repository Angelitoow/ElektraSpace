import { Perfil } from "./Perfil.js";

export class Usuario extends Perfil {
  constructor({
    idPerfil,
    nombres,
    apellidos,
    temaVisual,
    idioma,
    genero,
    fechaNacimiento,
    correo,
    contrasena,
    fechaCreacionCuenta,
    puntajeAcumulado,
  }) {
    super({
      idPerfil,
      nombres,
      apellidos,
      temaVisual,
      idioma,
      genero,
      fechaNacimiento,
      correo,
      contrasena,
    });
    this.fechaCreacionCuenta = fechaCreacionCuenta;
    this.puntajeAcumulado = puntajeAcumulado;
  }
}
