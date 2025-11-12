import "../styles/index.css";
import "../styles/simulation2.css";
import { Quiz } from "../components/Quiz";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Simulation2() {
  const [position, setPosition] = useState({ top: 1, left: 0.5 });
  const [message, setMessage] = useState("");
  const [dead, setDead] = useState(false);
  const [controlsLocked, setControlsLocked] = useState(true);
  const [teleporting, setTeleporting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [antiGravityActive, setAntiGravityActive] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const navigate = useNavigate();

  const speed = 3;
  // Refs necesarios para colisiones
  const playerRef = useRef(null);
  const areaRef = useRef(null);
  const rafRef = useRef(null);

  /*-----------------------------------------------Mensajes---------------------------------------------------*/
  useEffect(() => {
    const timers = [];
    setControlsLocked(true);
    // Mensaje 1
    timers.push(
      setTimeout(() => {
        setMessage(
          "🎮 CONTROLES: A/D = Mover | W/ESPACIO = Saltar | ¡Esquiva láseres y usa portales!"
        );
        setTimeout(() => setMessage(""), 2500);
      }, 1000)
    );

    // Mensaje 2
    timers.push(
      setTimeout(() => {
        setMessage(
          "🎯 MISIÓN: Recoge los 6 orbes cuánticos y llega a la zona ESCAPE"
        );
        setTimeout(() => setMessage(""), 2500);
      }, 4500)
    );

    // Mensaje 3
    timers.push(
      setTimeout(() => {
        setMessage(
          "⚡ PELIGROS: Láseres rotativos, campos de fuerza, zonas anti-gravedad"
        );
        setTimeout(() => setMessage(""), 2500);
      }, 8000)
    );

    timers.push(
      setTimeout(() => {
        setControlsLocked(false);
      }, 10500)
    );
    // Limpiar todos los temporizadores al desmontar
    return () => timers.forEach(clearTimeout);
  }, []);

  /*-----------------------------------------------Manejo de teclas---------------------------------------------------*/
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (controlsLocked || dead) return;
      setPosition((prev) => {
        let { top, left } = prev;
        const direction = antiGravityActive ? -1 : 1; // 🔁 invierte controles

        switch (event.key) {
          case "ArrowUp":
          case "w":
          case "W":
          case " ":
            top = Math.max(1, Math.min(90, top - speed * direction));
            break;
          case "ArrowDown":
          case "s":
          case "S":
            top = Math.max(1, Math.min(90, top + speed * direction));
            break;
          case "ArrowLeft":
          case "a":
          case "A":
            left = Math.max(0.5, Math.min(96, left - speed * direction));
            break;
          case "ArrowRight":
          case "d":
          case "D":
            left = Math.max(0.5, Math.min(96, left + speed * direction));
            break;
          default:
            break;
        }

        return { top, left };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [controlsLocked, dead, antiGravityActive]);

  /*-----------------------------------------------Colisiones---------------------------------------------------*/
  useEffect(() => {
    const checkCollision = () => {
      if (!playerRef.current || !areaRef.current) return;

      const playerRect = playerRef.current.getBoundingClientRect();
      const elements = areaRef.current.querySelectorAll(
        ".laser-beam, .laser-emitter, .nucleus, .platform"
      );
      const portals = areaRef.current.querySelectorAll(".quantum-portal");
      for (const portal of portals) {
        const portalRect = portal.getBoundingClientRect();
        const intersect =
          playerRect.left < portalRect.right &&
          playerRect.right > portalRect.left &&
          playerRect.top < portalRect.bottom &&
          playerRect.bottom > portalRect.top;

        if (intersect) {
          cancelAnimationFrame(rafRef.current);
          setTeleporting(true);
          setMessage("🌀 ¡Teletransportación cuántica activada!");

          if (portal.classList.contains("A")) {
            setPosition({ top: 10, left: 50 }); // destino del portal A
          } else if (portal.classList.contains("B")) {
            setPosition({ top: 80, left: 3 }); // destino del portal B
          }

          // Mostrar mensaje de teletransportación
          setTimeout(() => {
            setTeleporting(false);
            setMessage("");
            rafRef.current = requestAnimationFrame(checkCollision);
          }, 600);
          return;
        }
      }

      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        const intersect =
          playerRect.left < rect.right &&
          playerRect.right > rect.left &&
          playerRect.top < rect.bottom &&
          playerRect.bottom > rect.top;

        if (intersect) {
          handleDeath(element);
          break;
        }
      }

      const antiGravitys = areaRef.current.querySelectorAll(".anti-gravity");
      let isInside = false;
      for (const antiGravity of antiGravitys) {
        const antiGravityRect = antiGravity.getBoundingClientRect();
        const intersect =
          playerRect.left < antiGravityRect.right &&
          playerRect.right > antiGravityRect.left &&
          playerRect.top < antiGravityRect.bottom &&
          playerRect.bottom > antiGravityRect.top;
        if (intersect) {
          isInside = true;
        }
        if (isInside && !antiGravityActive) {
          setAntiGravityActive(true);
          setMessage("🌀 Has activado el modo antigravedad");
          setTimeout(() => setMessage(""), 2500);
        }
      }

      rafRef.current = requestAnimationFrame(checkCollision);
    };

    rafRef.current = requestAnimationFrame(checkCollision);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dead, teleporting, antiGravityActive]);

  /*-----------------------------------------------Muerte y reinicio---------------------------------------------------*/
  const handleDeath = (element) => {
    if (dead) return;
    setDead(true);

    if (
      element.classList.contains("laser-beam") ||
      element.classList.contains("laser-emitter")
    ) {
      setMessage("💀 Has tocado un láser... Has Perdido");
    } else if (element.classList.contains("nucleus")) {
      setMessage("💥 El núcleo te ha aniquilado...");
    } else if (element.classList.contains("platform")) {
      setMessage("⚠️ Has chocado contra una plataforma.");
    } else {
      setMessage("❌ Has colisionado con algo desconocido.");
    }
    setControlsLocked(true);

    setTimeout(() => {
      setDead(false);
      setAntiGravityActive(false);
      setPosition({ top: 1, left: 0.5 }); // reinicio al centro
      setMessage("");
      setControlsLocked(false);
    }, 500);
  };
  /*-----------------------------------------------Abrir/cerrar menú---------------------------------------------------*/
  useEffect(() => {
    const handleToggleMenu = (event) => {
      if (event.key === "m" || event.key === "M") {
        setMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleToggleMenu);
    return () => window.removeEventListener("keydown", handleToggleMenu);
  }, []);

  return (
    <div className="background-simulation2">
      {quizOpen && <Quiz onClose={() => setQuizOpen(false)} />}
      <div className="header-s2">
        <h1 className="tittle-s2">ESCAPE ELECTRÓNICO</h1>
        <h2 className="subtittle-s2">Aventura Cuántica Extrema</h2>
      </div>
      <div className="area-s2" ref={areaRef}>
        <div
          ref={playerRef}
          className="player"
          style={{
            top: `${position.top}%`,
            left: `${position.left}%`,
          }}
        ></div>
        <div className="nucleus"></div>
        <div id="scape">Escape</div>
        <div
          className="platform horizontal"
          style={{ top: "50%", left: "50%" }}
        ></div>
        <div
          className="platform vertical"
          style={{ top: "60%", left: "80%" }}
        ></div>
        <div
          className="platform circular"
          style={{ top: "77%", left: "25%" }}
        ></div>
        <div
          className="platform circular"
          style={{ top: "25%", left: "25%" }}
        ></div>
        <div className="laser-emitter" style={{ top: "50%", left: "25%" }}>
          <div className="laser-beam" style={{ top: "50%", left: "50%" }}></div>
        </div>
        <div className="laser-emitter" style={{ top: "50%", left: "75%" }}>
          <div className="laser-beam" style={{ top: "50%", left: "50%" }}></div>
        </div>
        <div className="energy-orb" style={{ top: "50%", left: "35%" }}></div>
        <div className="energy-orb" style={{ top: "10%", left: "80%" }}></div>
        <div className="energy-orb" style={{ top: "85%", left: "20%" }}></div>
        <div className="energy-orb" style={{ top: "90%", left: "60%" }}></div>
        <div className="energy-orb" style={{ top: "50%", left: "65%" }}></div>
        <div className="energy-orb" style={{ top: "10%", left: "22%" }}></div>
        <div
          className="quantum-portal A"
          style={{ top: "80%", left: "10%" }}
        ></div>
        <div
          className="quantum-portal B"
          style={{ top: "10%", left: "40%" }}
        ></div>
        <div className="anti-gravity"></div>
        <div className="gravity"></div>
        <div className="force-field " style={{ top: "40%", left: "15%" }}></div>
        <div className="force-field " style={{ top: "20%", left: "80%" }}></div>
        <div className="force-field " style={{ top: "80%", left: "80%" }}></div>
      </div>
      <div className={`controls-panel ${menuOpen ? "open" : ""}`}>
        <button className="toggle-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "→" : "←"}
        </button>
        <div className="controls">
          <h1>CONTROLES CUÁNTICOS</h1>
          <div className="count-Orb">Orbes Recolectados: 0/6</div>
          <div className="count-Time">Tiempo: 0 Segundos</div>
          <button onClick={() => setQuizOpen(true)} className="next">
            🎯Siguiente Simulación
          </button>
          <button>🚀Ayuda</button>
          <button onClick={() => navigate("/dashboard")}>🔄Salir</button>
          <p className="hint">
            💡 Presiona “M” para ocultar o mostrar este panel
          </p>
        </div>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}
