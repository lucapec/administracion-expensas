import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import luna from "../../images/luna.png";
import sol from "../../images/sol-blanco.png";
import "./Lightswitch.css";

function Lightswitch() {
  const { darkMode, manageDarkMode } = useContext(DarkModeContext);
  const handleDarkMode = () => {
    manageDarkMode();
  };
  return (
    <div className="Lightswitch">
      <img
        src={darkMode ? sol : luna}
        alt="Darkmode off"
        onClick={handleDarkMode}
      />
    </div>
  );
}

export default Lightswitch;
