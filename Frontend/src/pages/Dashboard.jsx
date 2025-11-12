import { useNavigate } from "react-router-dom";
import "../styles/index.css";
import "../styles/dashboard.css";
import { Planet } from "../components/Planet.jsx";
import { PlanetData } from "../components/PlanetData.jsx";
import { Intro } from "../components/Intro.jsx";
import { NavBar } from "../components/NavBar.jsx";
import { EditPassword } from "../components/EditPassword.jsx";
import { Theme } from "../components/Theme.jsx";
import { Quiz } from "../components/Quiz.jsx";
import { obtenerModulos } from "../services/sistemaController";
import {
  registrarIngresoModulo,
  registrarSalidaModulo,
  obtenerUltimoHistorial,
} from "../services/sistemaController";
import { useRef, useState, useEffect } from "react";

export function Dashboard() {
  const navigate = useNavigate();
  const [modulos, setModulos] = useState([]);
  const [showMission, setShowMission] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [showPlanetData, setShowPlanetData] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [selectedModulo, setSelectedModulo] = useState(null);
  const [historialActivo, setHistorialActivo] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (historialActivo) {
        try {
          await registrarSalidaModulo(historialActivo);
          console.log("🔴 Salida registrada:", historialActivo);
        } catch (error) {
          console.error("Error registrando salida:", error);
        }
      }
    };
    // Escucha el cierre o recarga de la ventana
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [historialActivo]);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const data = await obtenerModulos();

        // Obtener también el último historial por módulo
        const modulosConHistorial = await Promise.all(
          data.map(async (mod) => {
            const ultimo = await obtenerUltimoHistorial(mod.idModulo).catch(
              () => null
            );
            return {
              ...mod,
              ultimoIngreso: ultimo ? ultimo.fechaIngresoModulo : null,
            };
          })
        );

        setModulos(modulosConHistorial);
      } catch (error) {
        console.error("Error al obtener módulos:", error);
      }
    };

    // Llamar al cargar
    fetchModulos();

    // 🔁 Actualizar cada 60 segundos automáticamente
    const intervalo = setInterval(fetchModulos, 60000);

    return () => clearInterval(intervalo);
  }, []);

  const [showTheme, setShowTheme] = useState(false);
  const [usernameWidth, setUsernameWidth] = useState(0);
  const user = JSON.parse(localStorage.getItem("usuario"));
  const nombres = user.nombres ? user.nombres.trim().split(" ") : [];
  const apellidos = user.apellidos ? user.apellidos.trim().split(" ") : [];

  let primerNombre = nombres[0] || "";
  let primerApellido = apellidos[0] || "";

  // Si el primer nombre tiene menos de 7 letras → usar nombre + primera letra del apellido
  if (primerNombre.length < 7 && primerApellido) {
    primerNombre = `${primerNombre} ${primerApellido.charAt(0)}.`;
  }
  const usernameRef = useRef(null);

  const toggleNav = () => {
    if (usernameRef.current) {
      const width = usernameRef.current.offsetWidth;
      setUsernameWidth(width);
    }
    setShowNav((prev) => !prev);
  };

  const handleLogout = async () => {
    if (historialActivo) {
      try {
        await registrarSalidaModulo(historialActivo);
        console.log("🟠 Salida manual registrada:", historialActivo);
        setHistorialActivo(null);
      } catch (error) {
        console.error("Error registrando salida:", error);
      }
    }
    document.body.classList.remove("light-mode");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.temaVisual === 1) {
      document.body.classList.add("light-mode"); // tema claro
    } else {
      document.body.classList.remove("light-mode"); // tema oscuro por defecto
    }
  }, []);
  // se ejecuta solo al montar el componente

  return (
    <div className="background-dashboard">
      {showMission && <Intro onClose={() => setShowMission(false)} />}
      {showNav && (
        <NavBar
          width={usernameWidth}
          onClose={() => setShowNav(false)}
          onShowEdit={() => setShowEditPassword(true)}
          onShowTheme={() => setShowTheme(true)}
        />
      )}
      {showEditPassword && (
        <EditPassword onClose={() => setShowEditPassword(false)} />
      )}
      {showTheme && <Theme onClose={() => setShowTheme(false)} />}
      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
      {showPlanetData && <PlanetData onClose={() => setShowPlanetData(false)} modulo={selectedModulo} />}
      <div className="spaceship" style={{ top: "5%", left: "100%" }}>
        🚀
      </div>
      <div className="alien" style={{ top: "80%", left: "55%" }}>
        🛸
      </div>
      <div className="alien" style={{ top: "10%", left: "95%" }}>
        🛸
      </div>
      <div className="meteor" style={{ top: "15%", left: "15%" }}>
        ☄️
      </div>
      <div className="meteor" style={{ top: "15%", left: "90%" }}>
        ☄️
      </div>
      <div className="meteor" style={{ top: "40%", left: "85%" }}>
        ☄️
      </div>
      <div className="sonda" style={{ top: "70%", left: "25%" }}>
        🛰️
      </div>
      <div className="sonda" style={{ top: "50%", left: "50%" }}>
        🛰️
      </div>
      <div className="sonda" style={{ top: "5%", left: "50%" }}>
        🛰️
      </div>
      <div className="moon" style={{ top: "80%", left: "25%" }}>
        🌑
      </div>
      <div className="moon" style={{ top: "10%", left: "55%" }}>
        🌑
      </div>
      <div className="moon" style={{ top: "40%", left: "85%" }}>
        🌑
      </div>
      <button to="/" className="close-sesion" onClick={handleLogout}>
        🚪Cerrar Sesión
      </button>
      <h1 className="tittle-dashboard">ELEKTRASPACE</h1>
      <p className="subtittle-dashboard">
        Embárcate en una aventura cósmica para dominar los secretos de la
        física.
        <br />
        Explora los planetas únicos y desbloquea su poder.
      </p>
      <div className="contain-user" ref={usernameRef} onClick={toggleNav}>
        <span className="profile">👤</span>
        <span className="username"> {primerNombre}</span>
      </div>
      <img
        src="/nave.png"
        alt="nave"
        className="nave"
        onClick={() => setShowMission(true)}
      />
      <div className="system-solar ring0">
        <div className="sun">⭐</div>
      </div>
      {modulos.map((modulo, index) => (
        <div key={modulo.idModulo} className={`system-solar ring${index + 1}`}>
          <Planet
            name={modulo.nombreModulo}
            progress={modulo.progreso || 0} // si tiene progreso
            status={
              modulo.estadoModulo === "Disponible"
                ? "unlocked"
                : modulo.estadoModulo === "Sellado"
                ? "locked"
                : "completed"
            }
            type={`mundo${modulo.ordenSecuencia}`}
            ultimoIngreso={modulo.ultimoIngreso}
            onClick={async () => {
              setSelectedModulo(modulo);
              setShowPlanetData(true);

              try {
                // 1️⃣ Ver si ya hay un historial activo
                const ultimo = await obtenerUltimoHistorial(modulo.idModulo);

                if (!ultimo || ultimo.fechaSalidaModulo) {
                  // 2️⃣ No hay historial abierto → registrar nuevo ingreso
                  const nuevo = await registrarIngresoModulo(modulo.idModulo);
                  setHistorialActivo(nuevo.idHistorial);
                  console.log("🟢 Ingreso registrado:", nuevo.idHistorial);
                } else {
                  // 3️⃣ Ya hay un historial activo → usar el existente
                  setHistorialActivo(ultimo.idHistorial);
                  console.log(
                    "⚠️ Ya hay historial activo:",
                    ultimo.idHistorial
                  );
                }
              } catch (error) {
                console.error("Error registrando ingreso:", error);
              }
            }}
          />
        </div>
      ))}
      <div className="guide-panel">
        <h4>🎮 Guía del Explorador</h4>
        <ul>
          <li> Viaja entre planetas y domina su energía</li>
          <li>Completa misiones para desbloquear nuevos mundos</li>
          <li> Reúne sabiduría y obtén tu certificado estelar</li>
          <li>Conviertete en un maestro de la Física</li>
        </ul>
      </div>
    </div>
  );
}
