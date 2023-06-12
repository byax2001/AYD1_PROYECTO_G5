import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../css/LandingPage.css'; 

function LandingPage(props) {
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isRegisterDropdownOpen, setIsRegisterDropdownOpen] = useState(false);

  const toggleLoginDropdown = () => {
    setIsLoginDropdownOpen(!isLoginDropdownOpen);
    setIsRegisterDropdownOpen(false);
  };

  const toggleRegisterDropdown = () => {
    setIsRegisterDropdownOpen(!isRegisterDropdownOpen);
    setIsLoginDropdownOpen(false);
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <img id="logoLP" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className={`collapse navbar-collapse`}>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/isesion">Iniciar Sesión</a>
            </li>
            {/* DROPDOWN DE REGISTRARSE*/}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" onClick={toggleRegisterDropdown}>
                Registrarse
              </a>
              <div className={`dropdown-menu ${isRegisterDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown1">
                <a className="dropdown-item" href="/ru">Usuario</a>
                <a className="dropdown-item" href="/re">Repartidor</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/rempresa">Empresa</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div id="piepaginaLP" className="container-flexible bg-dark">
        <div className="row">
          <div className="col-2 h5 text-center">
            <Link to="/quienes-somos" className="custom-link">Quienes Somos</Link>
          </div>
          <div className="col-2 h5 text-center">
            <Link to="/equipo" className="custom-link">Equipo</Link>
          </div>
          <div className="col-2 h5 text-center">
            <Link to="/preguntas-frecuentes" className="custom-link">Preguntas Frecuentes</Link>
          </div>
          <div className="col-3 h5 text-center">
            <Link to="/terminos-condiciones" className="custom-link">Términos y condiciones</Link>
          </div>
          <div className="col-3 h5 text-center">
            <Link to="/politicas-privacidad" className="custom-link">Políticas de Privacidad</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
