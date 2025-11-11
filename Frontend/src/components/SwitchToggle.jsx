import { useState, useEffect } from "react";
import "../styles/switchToggle.css";

export function SwitchToggle({ onToggle, initialState = false }) {
  const [isOn, setIsOn] = useState(initialState);

  useEffect(() => {
    setIsOn(initialState); 
  }, [initialState]);

  const toggleSwitch = () => {
    setIsOn((prev) => {
      const nuevoEstado = !prev;
      if (onToggle) onToggle(nuevoEstado);
      return nuevoEstado;
    });
  };

  return (
    <div
      className={`toggle-switch ${isOn ? "on" : "off"}`}
      onClick={toggleSwitch}
    >
      <div className="switch-handle"></div>
    </div>
  );
}
