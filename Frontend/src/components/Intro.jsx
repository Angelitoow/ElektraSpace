import "../styles/intro.css";
export function Intro({ onClose }) {
  return (
    <div className="intro-container">
      <div className="intro-card">
        <h2>¡Bienvenido, Explorador Cósmico!</h2>
        <p>
          Has llegado al <strong>Centro de Control</strong> de{" "}
          <b>ElektraSpace</b>. Tu misión: explorar 5 planetas y dominar los
          secretos de la física.
        </p>

        <div className="intro-section">
          <h4>🎯 Tu Misión</h4>
          <p>
            Demuestra tu capacidad para dominar mundos y arriesgate a
            coleccionar las piezas fundamentales de cada planeta
          </p>
        </div>

        <div className="intro-icons">
          <div className="icons-left">
            <span>🏆</span>
            <div>Logros por desbloquear</div>
          </div>
          <div className="icons-right">
            <span>🚀 </span>
            <div>Aventura Interactiva</div>
          </div>
        </div>
        <button className="start-btn" onClick={onClose}>
          🚀 ¡Comenzar Exploración!
        </button>
      </div>
    </div>
  );
}
