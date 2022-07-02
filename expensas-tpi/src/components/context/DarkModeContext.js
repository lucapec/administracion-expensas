import React, {createContext, useState} from 'react'

export const DarkModeContext = createContext();

export const DarkModeProvider = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const manageDarkMode = () =>{
        setDarkMode(!darkMode);
    }
  return (
    <div>
        <DarkModeContext.Provider value={{darkMode, manageDarkMode}}>
            {props.children}
        </DarkModeContext.Provider>
    </div>
    
  );
}

