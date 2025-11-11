import "../styles/navBarAdmin.css";

export function NavBarAdmin({ width, onClose, onShowEdit, onShowTheme }) {
  return (
    <section className="navBarAdmin" style={{ width: `${width + 2}px` }}>
      <div className="management">Gestión</div>
      <button>📦Módulos</button>
      <button>📊Estadísticas</button>
      <button onClick={onShowTheme}>🎨Tema</button>
      <button onClick={onShowEdit}>✏️Contraseña</button>
    </section>
  );
}
