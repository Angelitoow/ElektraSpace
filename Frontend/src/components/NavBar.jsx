import "../styles/navBar.css";

export function NavBar({ width, onClose, onShowEdit, onShowTheme}) {
   return (
    <section className="navBar" style={{ width: `${width + 2}px` }}>
      <button onClick={onShowTheme}>🎨Tema</button>
      <button onClick={onShowEdit}>✏️Contraseña</button>
      <button>🎓Certificado</button>
    </section>
  );
}
