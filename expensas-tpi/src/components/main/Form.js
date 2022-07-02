import React, { useEffect, useState } from "react";

import "./Form.css";

export const Form = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [consult, setConsult] = useState([]);


  const errorName = validName(name);
  const errorSurname = validSurname(surname);
  const errorCellphone = validCellphone(cellphone);
  const errorEmail = valiEmail(email);
  const errorConsulta = valiConsulta(consult);


  return (
    <div className="login-form">
      <label className="form-title">CONTACTESE CON NOSOTROS</label>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          setName('');
          setSurname('');
          setEmail('');
          setCellphone('');
          setConsult([]);
        }}
      >
        <div className="login-form-items">
          <label>Ingrese su nombre</label>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            type="text"
            required
          />
          <p className="errores-consult">{errorName}</p>
        </div>
        <div className="login-form-items">
          <label>Ingrese su apellido</label>
          <input
            value={surname}
            onChange={(ev) => setSurname(ev.target.value)}
            type="text"
            required
          />
          <p className="errores-consult">{errorSurname}</p>
        </div>
        <div className="login-form-items">
          <label>Ingrese su numero de Teléfono</label>
          <input
            value={cellphone}
            onChange={(ev) => setCellphone(ev.target.value)}
            type="tel"
            required
          />
          <p className="errores-consult">{errorCellphone}</p>
        </div>
        <div className="login-form-items">
          <label>Ingrese su Email</label>
          <input value={email} onChange={(ev) => setEmail(ev.target.value)} type="email" required />
          <p className="errores-consult">{errorEmail}</p>
        </div>
        <div className="login-form-items">
          <label>Ingrese su consulta</label>
          <input value={consult} onChange={(ev) => setConsult(ev.target.value)} required/>
        </div>
        <p className="errores-consult">{errorConsulta}</p>
        <div className="login-form-items">
          <button type="submit" disabled={errorName}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

 const validName = (name) => {
    if (name.length < 2 && name.length > 0) return "El nombre debe contener mas de 2 letras"; };

const validSurname = (surname) => {
  if (surname.length < 3 && surname.length > 0) return "El apellido debe contener mas de 3 letras";
};

const validCellphone = (cellphone) => {
  if (isNaN(cellphone) || (cellphone.length < 6 && cellphone.length > 1)) return "Numero de telefono invalido";
};
 const valiEmail = (email) => {
   if (!email.includes('@') && email.length > 1 ) return "Email incorrecto";
 }

const valiConsulta = (consult) => {
  if (consult.length < 10 && consult.length > 0) return "Ingrese una consulta mas larga";
}
export default Form;
