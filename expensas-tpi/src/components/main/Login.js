import React, { useEffect, useState } from 'react';
import { useAuthDispatch, useAuth } from '../context/AuthContextProvider';
import "./Login.css";


export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // REVIEW: 6. uso del dispatch en un componente alejado
    const dispatch = useAuthDispatch();
    // equivalente: const auth = useContext(AuthContext);
    const auth = useAuth();

    useEffect(() => {
      console.log(auth.currentUser);
    }, [auth.currentUser])
    return (
        <div className="login-container">
            <label>Usuario</label>
            <input value={email} onChange={(event) => { setEmail(event.target.value) }} type="text" />
            <label>Contraseña</label>
            <input value={password} onChange={(event) => { setPassword(event.target.value) }} type="password" />
            {   auth.waitingLogin &&
                    <p className='logginp'>Logueando por favor espere ....</p>
            }
            {   !auth.waitingLogin &&
                <button
                    onClick={() => {
                        dispatch.login(email, password);
                    }}
                >Login</button>
            }
        </div>
    )
}