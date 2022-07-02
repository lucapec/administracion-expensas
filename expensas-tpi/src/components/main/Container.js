import React from "react";
import Nav from "./Nav";
import Main from "./Main";
import "./Container.css";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { useAuth } from "../context/AuthContextProvider";

import Userlogged from "./Userlogged";

const Container = () => {
  const auth = useAuth();

  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={
        darkMode ? "Container Container-dark" : "Container Container-light"
      }
    >
      <Nav />
      {auth.currentUser && (
        <>
          <Userlogged />
        </>
      )}
      {!auth.currentUser && (
        <>
          <Main />
        </>
      )}
    </div>
  );
};

export default Container;
