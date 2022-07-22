import React from "react";
import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Login";

import Lightswitch from "./Lightswitch";

import "./Container.css";
import "./Nav.css";
import { useAuth, useAuthDispatch } from "../context/AuthContextProvider";

const Nav = () => {
  const [mostrarComponente, setMostrarComponente] = useState(true);
  const dispatch = useAuthDispatch();
  const auth = useAuth();
 

  return (
    <div>
      <BrowserRouter>

        <nav className="nav-bar">
          <h1>AE</h1>

          <div className="buttons">
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
            {auth.currentUser && (
              <button onClick={() => {
                dispatch.logout();
              }}
              >
                CERRAR SESION
              </button>
            )}
            <Lightswitch />
          </div>
        </nav>
      </BrowserRouter>
    </div>
  );
};

export default Nav;
