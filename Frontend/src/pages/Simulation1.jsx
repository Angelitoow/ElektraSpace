import { useState, useEffect } from "react";
import "../styles/index.css";
import "../styles/simulation1.css";
import { useNavigate } from "react-router-dom";

export function Simulation1() {
  const [projectiles, setProjectiles] = useState([]);
  const [trajectory, setTrajectory] = useState([]);
  const [reload, setReload] = useState(1);
  const [lastShot, setLastShot] = useState(0);
  const [explosions, setExplosions] = useState([]);
  const [message, setMessage] = useState(""); // <-- NUEVO ESTADO PARA MENSAJES
  const navigate = useNavigate();

  const [atoms, setAtoms] = useState([
    { id: 1, type: "caotico", x: 0.25 * window.innerWidth, y: 0.72 * window.innerHeight },
    { id: 2, type: "caotico", x: 0.35 * window.innerWidth, y: 0.35 * window.innerHeight },
    { id: 3, type: "caotico", x: 0.5 * window.innerWidth, y: 0.45 * window.innerHeight },
    { id: 4, type: "caotico", x: 0.6 * window.innerWidth, y: 0.15 * window.innerHeight },
    { id: 5, type: "caotico", x: 0.65 * window.innerWidth, y: 0.7 * window.innerHeight },
    { id: 6, type: "caotico", x: 0.45 * window.innerWidth, y: 0.75 * window.innerHeight },
    { id: 7, type: "caotico", x: 0.1 * window.innerWidth, y: 0.05 * window.innerHeight },
    { id: 8, type: "caotico", x: 0.75 * window.innerWidth, y: 0.05 * window.innerHeight },
  ]);

  const cannonX = 80;
  const cannonY = 450;
  const mouthOffset = 120;

  const MAX_POWER_DIST = 300;
  const MAX_SPEED = 1000;
  const GRAVITY = 800;
  const COOLDOWN_MS = 800;

  const stabilizeAtom = (id) => {
    setAtoms((prev) =>
      prev.map((atom) =>
        atom.id === id ? { ...atom, type: "stabilized" } : atom
      )
    );
  };

  // --- Loop de animación ---
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const step = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      setProjectiles((prev) => {
        const updated = [];

        prev.forEach((p) => {
          const vy = p.vy + GRAVITY * dt;
          const x = p.x + p.vx * dt;
          const y = p.y + vy * dt;

          let collided = false;

          atoms.forEach((atom) => {
            if (atom.type === "caotico") {
              const coreX = atom.x + 25;
              const coreY = atom.y + 25;
              const dist = Math.hypot(x - coreX, y - coreY);
              if (dist < 60) {
                collided = true;
                stabilizeAtom(atom.id);
                setExplosions((exp) => [...exp, { id: Date.now(), x, y }]);
              }
            }
          });

          if (!collided && y < window.innerHeight - 50 && x > -200 && x < window.innerWidth - 50) {
            updated.push({ ...p, x, y, vy });
          }
        });

        return updated;
      });

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [atoms]);

  // recarga visual simple
  useEffect(() => {
    if (reload >= 1) return;
    const id = setInterval(() => setReload((r) => Math.min(1, r + 0.02)), 50);
    return () => clearInterval(id);
  }, [reload]);

  // trayectoria del puntero
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const dx = mx - cannonX;
    const dy = my - cannonY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const power = Math.min(dist, MAX_POWER_DIST);
    const speed = (power / MAX_POWER_DIST) * MAX_SPEED;
    const vx = speed * Math.cos(angle);
    const vy = speed * Math.sin(angle);
    const x0 = cannonX + mouthOffset * Math.cos(angle);
    const y0 = cannonY + mouthOffset * Math.sin(angle);

    const tMax = 1;
    const stepT = 0.25;
    const dots = [];
    for (let t = 0; t <= tMax; t += stepT) {
      const x = x0 + vx * t;
      const y = y0 + vy * t + 0.5 * GRAVITY * t * t;
      if (y > 550) break;
      dots.push({ x, y });
    }
    setTrajectory(dots);
  };

  // limpiar explosiones antiguas
  useEffect(() => {
    if (explosions.length === 0) return;
    const timer = setInterval(() => {
      setExplosions((exp) => exp.slice(1));
    }, 700);
    return () => clearInterval(timer);
  }, [explosions]);

  // disparar
  const handleClick = (e) => {
    const now = performance.now();
    if (reload < 1) return;
    if (now - lastShot < COOLDOWN_MS) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const dx = mx - cannonX;
    const dy = my - cannonY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const power = Math.max(10, Math.min(dist, MAX_POWER_DIST));
    const speed = (power / MAX_POWER_DIST) * MAX_SPEED;
    const vx = speed * Math.cos(angle);
    const vy = speed * Math.sin(angle);
    const px = cannonX + mouthOffset * Math.cos(angle);
    const py = cannonY + mouthOffset * Math.sin(angle);

    setProjectiles((prev) => [
      ...prev,
      { id: Date.now(), x: px, y: py, vx, vy },
    ]);
    setReload(0);
    setLastShot(now);
  };

  const estabilizadosCount = atoms.filter((a) => a.type === "stabilized").length;
  const restantesCount = atoms.filter((a) => a.type === "caotico").length;

  /*------------------------------------ NUEVO: MENSAJES EDUCATIVOS AL ESTILO Simulation2 ------------------------------------*/
  useEffect(() => {
    const timers = [];
    setMessage("");

    // Mensaje 1
    timers.push(
      setTimeout(() => {
        setMessage("🎮 CONTROLES: Haz clic para disparar el cañón y estabilizar átomos.");
        setTimeout(() => setMessage(""), 2500);
      }, 1000)
    );

    // Mensaje 2
    timers.push(
      setTimeout(() => {
        setMessage("⚡ OBJETIVO: Convierte todos los átomos caóticos en estabilizados.");
        setTimeout(() => setMessage(""), 2500);
      }, 4500)
    );

    // Mensaje 3
    timers.push(
      setTimeout(() => {
        setMessage("🎯 CONSEJO: Observa la trayectoria antes de disparar para apuntar mejor.");
        setTimeout(() => setMessage(""), 2500);
      }, 8000)
    );

    // Mensaje 4
    timers.push(
      setTimeout(() => {
        setMessage("💡 Tip: Los átomos estabilizados muestran órbitas ordenadas y electrones alineados.");
        setTimeout(() => setMessage(""), 2500);
      }, 11500)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="background-simulation1" onClick={handleClick}>
      <div className="header-s1">
        <h1 className="tittle-s1">CAÑÓN ATÓMICO</h1>
        <h2 className="subtittle-s1">ElektraSpace • Planeta Átomos</h2>
      </div>

      <div
        className="game-area"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{ width: "100vw", height: "100vh", position: "relative" }}
      >
        <div
          className="cannon-container"
          style={{
            left: cannonX - 20 + "px",
            top: cannonY - 40 + "px",
            position: "absolute",
            pointerEvents: "none",
          }}
        >
          <div className="cannon-base"></div>
          <div className="cannon-body" id="cannon">
            <div className="cannon-mouth"></div>
            <div className="cannon-details"></div>
          </div>
        </div>
      </div>

      {/* trayectoria punteada */}
      {trajectory.map((dot, i) => (
        <div
          key={i}
          className="trajectory-dot"
          style={{ left: dot.x + "px", top: dot.y + "px" }}
        />
      ))}

      {/* explosiones */}
      {explosions.map((ex) => (
        <div
          key={ex.id}
          className="explosion"
          style={{ left: ex.x + "px", top: ex.y + "px" }}
        />
      ))}

      {/* proyectiles */}
      {projectiles.map((p) => (
        <div
          key={p.id}
          className="projectil"
          style={{ top: p.y + "px", left: p.x + "px" }}
        />
      ))}

      {/* barra recarga */}
      <div className="bar">
        <div className="reload" style={{ width: `${reload * 100}%` }} />
      </div>

      {/* atomos (render dinámico) */}
      {atoms.map((atom) => (
        <div
          key={atom.id}
          className={`atom ${atom.type}`}
          style={{ top: atom.y + "px", left: atom.x + "px" }}
        >
          <div className="planet-core">
            <div className="planet-surface"></div>
            <div className="planet-surface"></div>
            <div className="planet-surface"></div>
          </div>
          {atom.type === "caotico" ? (
            <>
              <div className="orbit-ring orbit-1">
                <div className="satellite satellite-1"></div>
              </div>
              <div className="orbit-ring orbit-2">
                <div className="satellite satellite-2"></div>
              </div>
            </>
          ) : (
            <>
              <div className="orbit-ring orbit-1">
                <div className="satellite satellite-1"></div>
                <div className="satellite satellite-2"></div>
                <div className="satellite satellite-3"></div>
                <div className="satellite satellite-4"></div>
              </div>
              <div className="orbit-ring orbit-2">
                <div className="satellite satellite-1"></div>
                <div className="satellite satellite-2"></div>
                <div className="satellite satellite-3"></div>
                <div className="satellite satellite-4"></div>
              </div>
            </>
          )}
        </div>
      ))}

      {/* MENU - contadores dinámicos */}
      <div className="menu">
        <h2>CONTROL CENTRAL</h2>
        <div className="count-stabilized">
          Átomos Estabilizados: {estabilizadosCount}
        </div>
        <div className="count-caos">Restantes en Caos: {restantesCount}</div>
        <div className="menu-buttons">
          <button>🔬Escanear Átomos</button>
          <button onClick={() => navigate("/simulation2")} className="next">
            🎯Siguiente Simulación
          </button>
          <button>🚀Ayuda</button>
          <button>🔄Salir</button>
        </div>
      </div>

      {/* MENSAJE EDUCACIONAL */}
      {message && (
        <div
          className="message"
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.75)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            zIndex: 9999,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
