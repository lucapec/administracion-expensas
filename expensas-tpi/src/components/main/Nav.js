import React from "react";
import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Lightswitch from "./Lightswitch";

import "./Container.css";
import "./Nav.css";
import { useAuth } from "../context/AuthContextProvider";

const Nav = () => {
  const [mostrarComponente, setMostrarComponente] = useState(true);
  const auth = useAuth();
  return (
    <div>
      <BrowserRouter>
        <Routes>{/*   <Route path="/login" element={<Login />} />  */}</Routes>

        <nav className="nav-bar">
          <h1>AE</h1>

          <div className="buttons">
            {/*      <button onClick={() => setMostrarComponente(!mostrarComponente)}>
              INICIAR SESION
            </button>  */}
            {!auth.currentUser && (
              <>
                <NavLink to="/login">
                  {mostrarComponente ? (
                    <button
                      onClick={() => setMostrarComponente(!mostrarComponente)}
                    >
                      INICIAR SESION
                    </button>
                  ) : (
                    <Login />
                  )}
                </NavLink>
              </>
            )}
            <Lightswitch />
          </div>
        </nav>
      </BrowserRouter>
    </div>
  );
};

export default Nav;
