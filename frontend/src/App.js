import './App.css';
import React, { useEffect, useState } from 'react';
import {Route,BrowserRouter,Routes} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context';
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

//Empresa:
import InicioE from './components/Empresa/InicioE';
import RegstroEe from './components/Empresa/RegistroEe';
import { AuthProvider } from './context';

//Todo lo de Usuario

import Iniciouser from './components/Usuario/InicioUsuario';
import PanelE from './components/Usuario/PanelEmpresa';
import PanelCa from './components/Usuario/PanelCategoria';



function App() {
  const [infoUser, setInfoUser] = useState({
    iduser:'',
    token:'',
    idempresa:'',
    rol:7
  })

  return (
        <Provider>
            <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ru" element={<RegistroUsuario />} />
            <Route path="/re" element={<RegistroEmpleado />} />
            <Route path="/rempresa" element={<RegistroEmpresa />} />
            <Route path="/isesion" element={<InitSesion />} />
            <Route path="/emp/Miperfil" element={<Perfil />} />
            <Route path="/emp" element={<InicioEmp />} />
            <Route path="/infoP" element={<MPiePagina />} />
            <Route path="/adm" element={<InicioAdm />} />
            <Route path="/infV" element={<InformeVentas />} />
            <Route path="/infU" element={<InformeUsuarios />} />
            <Route path="/infR" element={<InformeRepartidores />} />
            <Route path="/inicioe" element={<InicioE />} />
            <Route path="/registroPro" element={<RegstroEe />} />
            <Route path="/inicioU" element={<Iniciouser />} />
            <Route path="/panelE/:title" element={<PanelE />} />
            <Route path="/panelC/:title" element={<PanelCa />} />
          </Routes>
        </BrowserRouter>
        </Provider>
        
      

  );
}

export default App;
