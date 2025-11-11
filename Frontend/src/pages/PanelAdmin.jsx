import "../styles/panelAdmin.css";
import { useState, useRef, useEffect } from "react";
import { NavBarAdmin } from "../components/NavBarAdmin.jsx";
import { EditPassword } from "../components/EditPassword.jsx";
import { Theme } from "../components/Theme.jsx";
import { useNavigate } from "react-router-dom";

export function PanelAdmin() {
  const [showNavBarAdmin, setShowNavBarAdmin] = useState(false);
  const [usernameWidth, setUsernameWidth] = useState(0);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const user = JSON.parse(localStorage.getItem("usuario"));
  const nombres = user.nombres ? user.nombres.trim().split(" ") : [];
  const apellidos = user.apellidos ? user.apellidos.trim().split(" ") : [];
  const navigate = useNavigate();
  let primerNombre = nombres[0] || "";
  let primerApellido = apellidos[0] || "";
  const usernameRef = useRef(null);


  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.temaVisual === 1) {
      document.body.classList.add("light-mode"); 
    } else {
      document.body.classList.remove("light-mode"); 
    }
  }, []);


  const toggleNav = () => {
    if (usernameRef.current) {
      const width = usernameRef.current.offsetWidth;
      setUsernameWidth(width);
    }
    setShowNavBarAdmin((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.body.classList.remove("light-mode");
    navigate("/login");
  };

  return (
    <div className="background-panelAdmin">
      {showNavBarAdmin && (
        <NavBarAdmin
          width={usernameWidth}
          onClose={() => setShowNavBarAdmin(false)}
          onShowEdit={() => setShowEditPassword(true)}
          onShowTheme={() => setShowTheme(true)}
        />
      )}
      {showEditPassword && (
        <EditPassword onClose={() => setShowEditPassword(false)} />
      )}
      {showTheme && <Theme onClose={() => setShowTheme(false)} />}
      <h1 className="tittle-Admin">PANEL DE ADMINISTRACIÓN</h1>
      <button className="close-sesion" onClick={handleLogout}>
        🚪Cerrar Sesión
      </button>
      <div className="contain-user" ref={usernameRef} onClick={toggleNav}>
        <span className="profile">👤</span>
        <span className="username-Admin">
          {primerNombre} {primerApellido}
        </span>
      </div>
      <div className="total">
        <div className="total-statistic">
          <div className="total-users">
            👥USUARIOS <h1>1</h1> <p>Usuarios Registrados</p>
          </div>
          <div className="total-simulations">
            🧪SIMULACIONES <h1>10</h1> <p>Simulaciones Creadas</p>
          </div>
          <div className="total-quizzes">
            ❓QUIZZES <h1>5</h1> <p>Quizzes Creados</p>
          </div>
        </div>
        <div className="total-modules">
          🌍MODULOS <h1>5</h1> <p>Mundos Disponibles</p>
        </div>
      </div>
    </div>
  );
}
