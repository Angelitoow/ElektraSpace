import "../styles/quiz.css";
import { useState } from "react";

export function Quiz({ onClose }) {
  const [message, setMessage] = useState("");
  const preguntas = [
    {
      id: 1,
      pregunta:
        "¿Cuál es la ley fundamental que describe la fuerza entre cargas eléctricas?",
      opciones: [
        "Ley de Ohm",
        "Ley de Coulomb",
        "Ley de Faraday",
        "Ley de Ampère",
      ],
    },
    {
      id: 2,
      pregunta: "¿Qué determina si un material es conductor o aislante?",
      opciones: [
        "Su color",
        "Su peso",
        "Sus electrones libres",
        "Su temperatura",
      ],
    },
  ];
  const handleRecolect = () => {
    setMessage(
      <>
        <span>🌀</span> <br />
        ¡PLANETA DESBLOQUEADO! <br />
        MAGNETRON ahora está disponible para explorar
        <button
          className="exit-quiz"
          onClick={() => {
            onClose();
            setMessage("");
          }}
        >
          Continuar
        </button>
      </>
    );
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h1>🧬¡Quiz Final!</h1>
        <h2>Puntuación de Desafíos: 0/10</h2>
        <div className="description-quiz">
          <h3>
            🏆 Responde correctamente para obtener la Núcleo de la Creación
          </h3>
          <p>Esta pieza te permitirá avanzar al siguiente planeta</p>
        </div>
        <div className="questions-quiz">
          {preguntas.map((p) => (
            <div key={p.id} className="question-card">
              <h2>
                {p.id}. {p.pregunta}
              </h2>
              <div className="options-grid">
                {p.opciones.map((opcion, index) => (
                  <button key={index} className="option-btn">
                    {String.fromCharCode(65 + index)}) {opcion}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="recolect-piece" onClick={handleRecolect}>
          🏆 Obtener Núcleo de la Creación
        </button>
        <p>Completa todas las preguntas antes de continuar</p>
      </div>
      <div>{message && <div className="message">{message}</div>}</div>
    </div>
  );
}
