import "../styles/planetData.css";
import {Link} from "react-router-dom";

export function PlanetData({ onClose, modulo }) {
    if (!modulo) return null;

  return (
    <div className="planetData-container">
      <div className="planetData-card">
        <h1>{modulo.nombreModulo}</h1>
        <p>Un mundo cristalino donde los átomos danzan en perfecta armonía</p>
        <div className="description-container">
          <h1>📖 Bitácora del Explorador</h1>
          <div className="description">
             {modulo.descripcionModulo}
          </div>
          <div className="description-mision">
            <h2>🎯 Misión Actual:</h2>
            <p>
              Los cristales contienen el conocimiento atómico necesario para
              reparar tu nave. Debes completar 2 desafíos interactivos para
              desbloquear el Núcleo Fundamental de este mundo.
            </p>
            <div className="description-piece">
              <p>
                ⚛️ Pieza Fundamental: Núcleo de la Creación La esencia
                fundamental de toda materia en el universo 🔒 Se desbloquea al
                completar todos los desafíos
              </p>
            </div>
          </div>
        </div>
        <div className="progress-container">
          <div className="progress">
            <p>
              🧩 Progreso de Desafíos
              <br />
              Completados 0/10 desafíos
              <br />
              🏆 Desafíos superados: 0/10
              <br />
              ⭐Puntos acumulados: 0/1000
            </p>
          </div>
          <div className="inventary">
            <p>
              🎒 Inventario Piezas Fundamentales:
              <br />
              Ninguna pieza recolectada aún
            </p>
          </div>
        </div>
        <div className="button-container">
          <button id="back" onClick={onClose}>
            🚀 Volver al Espacio
          </button>
          <Link to="/simulation1" id="init">🧪 Iniciar Desafíos Interactivos</Link>
        </div>
      </div>
    </div>
  );
}
