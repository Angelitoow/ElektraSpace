export class Perfil {
  constructor({ idPerfil, nombres, apellidos, temaVisual, idioma, genero, fechaNacimiento, correo, contrasena }) {
    this.idPerfil = idPerfil;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.temaVisual = temaVisual;
    this.idioma = idioma;
    this.genero = genero;
    this.fechaNacimiento = fechaNacimiento;
    this.correo = correo;
    this.contrasena = contrasena;
  }
}
