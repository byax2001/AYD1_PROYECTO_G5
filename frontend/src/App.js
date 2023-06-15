import './App.css';
import React, { useEffect, useState } from 'react';
import {Route,BrowserRouter,Routes} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//LANDING PAGE
import LandingPage from './components/LandingPage';
import MPiePagina from './components/MPiePagina';
// REGISTROS
import RegistroUsuario from './components/RegistroUsuario';
import RegistroEmpleado from './components/RegistroEmpleado'
import RegistroEmpresa from './components/RegistroEmpresa'
//INICIAR SESION
import InitSesion from './components/InitSesion';
//EMPLEADO
import Perfil from './components/Empleado/Perfil';
import InicioEmp from './components/Empleado/Inicio';
//ADMIN
import InicioAdm from './components/Admin/Inicio';
//INFORMES
import InformeVentas from './components/Admin/informes/InformeVentas/Informe';
import InformeRepartidores from './components/Admin/informes/InformeRepartidores/Informe';
import InformeUsuarios from './components/Admin/informes/InformeUsuarios/Informe';

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
        <Route path="/emp/Miperfil" exact element={<Perfil/>}/>
        <Route path="/emp" exact element={<InicioEmp/>}/>
        <Route path="/infoP" exact element={<MPiePagina/>}/>
        <Route path="/adm" exact element={<InicioAdm/>}/>
        <Route path="/infV" exact element={<InformeVentas/>}/>
        <Route path="/infU" exact element={<InformeUsuarios/>}/>
        <Route path="/infR" exact element={<InformeRepartidores/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
