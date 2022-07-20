import { useAuthDispatch, useAuth } from "../context/AuthContextProvider";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import "./UserLogged.css";

function Userlogged() {
  const auth = useAuth();
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/user')
      .then((response) => {
        return response.json()
      })
      .then((body) =>{
        const users = body.filter((x) => (x.sudo == 'user'))
        setUsers(users);
        console.log(users); 
    })}, 
    []);

    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);

    const [userSelected, setUserSelected] = useState({
      sudo: '',
      id: '',
      name: '',
      lastname: '',
      password: '',
      edificio: '',
      valor: '',
      mes: '',
    });

    const selectUser=(element, _case)=>{
      setUserSelected(element);
      (_case==='Editar')?setModalEditar(true):setModalEliminar(true)
        };

        const handleChange=e=>{
          const {name, value}=e.target;
          setUserSelected((prevState)=>({
            ...prevState,
            [name]: value
          }));
        }

        const edit=()=>{
          var newData=users;
          newData.map(users=>{
            if(users.id===userSelected.id){
              users.sudo=userSelected.sudo;
              users.name=userSelected.name;
              users.lastname=userSelected.lastname;
              users.password=userSelected.password;
              users.edificio=userSelected.edificio;    
              users.valor=userSelected.valor;
              users.mes=userSelected.mes;
            }
          });
          setUsers(newData);
          setModalEditar(false);
        }
      
        const eliminar =()=>{
          setUsers(users.filter(users=>users.id!==userSelected.id));
          setModalEliminar(false);
        }

        const abrirModalInsertar=()=>{
          setUserSelected(null);
          setModalInsertar(true);
        }

        const insertar =()=>{
          var newValue=userSelected;
          newValue.id=users[users.length-1].id+1;
          var newData = users;
          newData.push(newValue);
          setUsers(newData);
          setModalInsertar(false);
        }

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
        <div>
           <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
             <div>
                <Table striped bordered hover variant="dark">
                <thead>
                <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th colSpan={2}>Deuda</th>
        </tr>
      </thead>
          {users.map(x => (
           
       
      <tbody>
        <tr>
          <td>{x.sudo}</td>
          <td>{x.id}</td>
          <td>{x.name}</td>
          <td>{x.lastname}</td>
          <td>{x.edificio}</td>
          <td>{x.valor}</td>
          <td>{x.mes}</td>
          <td><button className="btn btn-primary" onClick={()=>selectUser(x, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>selectUser(x, 'Eliminar')}>Eliminar</button></td>
        </tr>
        </tbody>
  ))}
          
    </Table>
    <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Sudo</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="sudo"
              value={userSelected && userSelected.sudo}
            />
            <br />

            <label>Id</label>
            <input
              className="form-control"
              type="text"
              name="id"
              value={userSelected && userSelected.id}
              onChange={handleChange}
            />
            <br />

             <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={userSelected && userSelected.name}
              onChange={handleChange}
            />
            <br />
            <br />

<label>Apellido</label>
<input
  className="form-control"
  type="text"
  name="lastname"
  value={userSelected && userSelected.lastname}
  onChange={handleChange}
/>
<br />
<br />

<label>Contraseña</label>
<input
  className="form-control"
  type="text"
  name="password"
  value={userSelected && userSelected.password}
  onChange={handleChange}
/>
<br />
<br />

<label>Edificio</label>
<input
  className="form-control"
  type="text"
  name="edificio"
  value={userSelected && userSelected.edificio}
  onChange={handleChange}
/>
<br />
<br />

<label>Deuda</label>
<input
  className="form-control"
  type="text"
  name="valor"
  value={userSelected && userSelected.valor}
  onChange={handleChange}
/>
<br />
<br />

<label>mes</label>
<input
  className="form-control"
  type="text"
  name="mes"
  value={userSelected && userSelected.mes}
  onChange={handleChange}
/>
<br />
    </div>
    </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>edit()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el Usuario {userSelected && userSelected.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar País</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={users.id + 1 }
            />
            <br />

            <label>Sudo</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="sudo"
              value={userSelected ? userSelected.sudo: ''}
              onChange={handleChange}
            />
            <br />

            <label>Id</label>
            <input
              className="form-control"
              type="text"
              name="id"
              value={userSelected ? userSelected.id: ''}
              onChange={handleChange}
            />
            <br />

             <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={userSelected ? userSelected.name: ''}
              onChange={handleChange}
            />
            <br />
            <br />

<label>Apellido</label>
<input
  className="form-control"
  type="text"
  name="lastname"
  value={userSelected ? userSelected.lastname: ''}
  onChange={handleChange}
/>
<br />
<br />

<label>Contraseña</label>
<input
  className="form-control"
  type="text"
  name="password"
  value={userSelected ? userSelected.password: ''}
  onChange={handleChange}
/>
<br />
<br />

<label>Edificio</label>
<input
  className="form-control"
  type="text"
  name="edificio"
  value={userSelected ? userSelected.edificio: ''}
  onChange={handleChange}
/>
<br />
<br />

<label>Deuda</label>
<input
  className="form-control"
  type="text"
  name="valor"
  value={userSelected ? userSelected.valor: ''}
  onChange={handleChange}
/>
<br />
<br />

<label>Mes</label>
<input
  className="form-control"
  type="text"
  name="mes"
  value={userSelected ? userSelected.mes: ''}
  onChange={handleChange}
/>
<br />
        </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  

  </div>
)}</div>
  )
      }

    

export default Userlogged;