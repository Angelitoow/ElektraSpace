import "../styles/planet.css";

export const Planet = ({
  name,
  progress,
  status,
  type,
  ultimoIngreso,
  onClick,
}) => {
  
  const fechaFormateada = ultimoIngreso
    ? new Date(ultimoIngreso).toLocaleString("es-CO", {
        dateStyle: "short",
        timeStyle: "short",
        hour12: true,
        timeZone: "America/Bogota",
      })
    : "Sin registro";

  return (
    <div className={`planet ${type}`} onClick={onClick}>
      <div className="last-access">🕓{fechaFormateada}</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
      <p className="name-planet">{name}</p>
      {status === "locked" ? (
        <p className="blocked">🔒Sellado</p>
      ) : status === "unlocked" ? (
        <p className="unlocked">⭐Disponible</p>
      ) : (
        <p className="completed">✅Terminado</p>
      )}
    </div>
  );
};
