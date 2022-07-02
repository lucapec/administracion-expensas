import React from "react";
import Form from "./Form";
import "./Main.css";

const main = () => {
  return (
    <div className="main-group">
      <div className="title-section">
        <h1>
          Bienvenido a <br />
          Autogestion Expensas!
        </h1>
        <p>
          Una nueva experiencia en gestión de consorcios.
          <br /> Un sistema integral para la administración de edificios
          privados.
        </p>
      </div>
        <div className="form-section">
      <Form />
      </div>
    </div>
  );
};

export default main;
