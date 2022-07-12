import { useAuthDispatch, useAuth } from "../context/AuthContextProvider";
import React from "react";
import "./UserLogged.css";

function Userlogged() {
  const auth = useAuth();
  return (
    <div className="userloged">
      {auth.currentUser.sudo == 'user' && (
      <div className="container">
        <div className="text-loged">
          <h1>Bienvenido {auth.currentUser.name}</h1>
          <h2>
            Usted debe $ {auth.currentUser.valor}, del mes{" "}
            {auth.currentUser.mes}
          </h2>
          <p>
            Como abonar? Debe acercarse a nuestras oficinas ubicadas en Pte Roca
            796, aceptamos pago en debito o contado
          </p>
       
          <div className="comp-pago">
            <label>Adjuntar comprobante de pago:</label>
            <input type="file" className="inputarchive" />
          </div>
        </div>
      </div>
)}
{auth.currentUser.sudo == 'admin' && (
  fetch('http://localhost:5000/user')
 .then((response) => {
  return response.json()
 })
 .then((body) =>{
  const users = body.filter((x => x.sudo == 'user').map((x) => (

  );
  console.log(users);
  return users;
}
 ,<p>{users}</p>))
};

 

    </div>
  );
}

export default Userlogged;
