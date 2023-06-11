import './App.css';

import {Route,BrowserRouter,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//LANDING PAGE
import LandingPage from './components/LandingPage';
// REGISTROS
import RegistroUsuario from './components/RegistroUsuario';
import RegistroEmpleado from './components/RegistroEmpleado'
import RegistroEmpresa from './components/RegistroEmpresa'
//INICIAR SESION
import InitSesion from './components/InitSesion';
function App() {
  return (
    //routes 
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LandingPage/>}/>
        <Route path="/ru" exact element={<RegistroUsuario/>}/>
        <Route path="/re" exact element={<RegistroEmpleado/>}/>
        <Route path="/rempresa" exact element={<RegistroEmpresa/>}/>
        <Route path="/isesion" exact element={<InitSesion/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
