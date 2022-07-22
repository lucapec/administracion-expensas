
import React, { useReducer, createContext, useContext, useState, useEffect } from "react";

const initialState = {
    currentUser: null,
    waitingLogin: false,
    loginError: '',
    edificioUser : '',
    deudaUser : '',
    sudo: ''

};

export const AuthContext = createContext(initialState);
export const AuthDispatchContext = createContext(null);

export default function AuthContextProvider ({ children }) {
    const [auth, dispatch] = useReducer(authReducer, initialState);
    

    const baseUrl = 'http://localhost:5000/user';
    const asyncDispatcher = {
        login: (nameParam, password) => {
            dispatch({ type: 'setWaitingLogin', waiting: true });
            fetch(baseUrl)
            .then ((response) => {
                return response.json()
            }
            )
            .then ((body) => {
                const user = body.find(x=>x.name.toLowerCase() === nameParam.toLowerCase() && x.password === password) 
                if (user) {
                    dispatch({ type: 'setCurrentUser', currentUser: user, error: 'Usuario correcto'});
                   
                }  else {
                dispatch({ type: 'setError', error: 'Usuario inexistente.' });
                alert("Usuario incorrecto");
                } 
            })
            return;
        },
        logout: () => {
            dispatch({ type: 'setCurrentUser', currentUser: null });
            dispatch({ type: 'setToken', token: null });
        }
        
    };

    return (
        <AuthContext.Provider value={auth}>
            <AuthDispatchContext.Provider value={asyncDispatcher}>
                { children }
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}

export function authReducer(state, action) {
    console.log('authReducer', action.type, state, action);
    switch (action.type) {
        case 'setCurrentUser': {
          return {...state, 
            currentUser: action.currentUser,
            waitingLogin: false
          };
        }
        case 'setToken': {
          return {...state,
            token: action.token,
          };
        }
        case 'setWaitingLogin': {
          return {...state,
            waitingLogin: action.waiting,
          };
        }
        case 'setError': {
          return {...state,
            loginError: action.error,
            waitingLogin: false
          };
        }
        default: {
          throw Error('Unknown action: ' + action.type);
        }
    }
}

export function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}
  
export function useAuthDispatch() {
    return useContext(AuthDispatchContext);
}

export function useCapitalizeName (initialName) {
    const [name, setInternalName] = useState(initialName);
    useEffect(() => {
        if (name && new RegExp("[a-z]").test(name)) {
            setInternalName(name.toUpperCase());
        }
    }, [name])
    return name;
}