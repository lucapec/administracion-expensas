import './App.css';
import AuthContextProvider from './components/context/AuthContextProvider';
import {DarkModeProvider} from './components/context/DarkModeContext';
import Container from './components/main/Container';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
     <DarkModeProvider>
      <AuthContextProvider>
     <Container />
     </AuthContextProvider>
     </DarkModeProvider>

    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Container/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
