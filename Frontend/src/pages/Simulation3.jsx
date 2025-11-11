import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/simulation3.css";

export function Simulation3() {
  return (
    <div className="background-simulation3">
      <div className="header-s3">
        <h1 className="tittle-s3">PUZZLE ORBITAL</h1>
        <h2 className="subtittle-s3">Maestro de la Configuración Electrónica</h2>
      </div>
      <div className="ring1-s3">
        <div className="ring2-s3">
          <div className="ring3-s3">
            <div className="ring4-s3">
              <div className="nucleus-s3"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-electrons"> ELECTRONES DISPONIBLES</div>
      <div className="menu-s3"></div>
    </div>
  );
}
