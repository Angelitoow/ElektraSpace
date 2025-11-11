export class HistorialAcceso {
  constructor({
    idHistorial,
    fechaIngresoModulo,
    fechaSalidaModulo,
    tiempoUso,
  }) {
    this.idHistorial = idHistorial;
    this.fechaIngresoModulo = fechaIngresoModulo;
    this.fechaSalidaModulo = fechaSalidaModulo;
    this.tiempoUso = tiempoUso;
  }
}
