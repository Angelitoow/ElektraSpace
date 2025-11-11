import { Perfil } from "./Perfil.js";

export class Administrador extends Perfil {
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
    fechaUltimoIngreso
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
    this.fechaUltimoIngreso = fechaUltimoIngreso;
  }
}
