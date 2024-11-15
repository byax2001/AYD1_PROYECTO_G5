import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo copy.png';
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

  useEffect(()=>{
    //SE SETEA DE ESTA FORMA PARA QUE SU VALOR NO SEA POR DEFAULT 0 Y SE PUEDA INGRESAR AL USUARIO ADMIN
    localStorage.setItem('rol',-1)
  },[])


  const Lema=()=>{
    return (
      <div id="lemaLanding">
        <div className="row">
          <div className="col-1" />
          <div className="col-6 ml-3">
            <div className="row">
              <div className="col-2 p-0">
                <div className='textForm h1 display-1' style={{ textAlign: 'right', color: '#DB4F23' }}>
                  Al
                </div>
              </div>
              <div className="col-10 p-0">
                <div className='textForm h1 display-1' style={{ textAlign: 'left', color: '#F9F4EF' }}>
                  Chilazo</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="text-light text-left h4">
                  <em>Sabor Guatemalteco, ¡A tu alcance!</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <React.Fragment>
      <div id="bgLP">
        <nav className="navbar navbar-expand-lg navbar-light">
          <img id="logoLP" src={logo} alt="Logo" />
          <a className="navbar-brand" href="/">AlChilazo</a>
          <div className={`collapse navbar-collapse`}>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/isesion">Iniciar Sesión</a>
              </li>
              {/* DROPDOWN DE REGISTRARSE*/}
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" id="navbarDropdown1" role="button" onClick={toggleRegisterDropdown}>
                  Registrarse
                </button>
                <div className={`dropdown-menu ${isRegisterDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown1">
                  <a className="dropdown-item" href="/ru">Usuario</a>
                  <a className="dropdown-item" href="/re">Repartidor</a>
                  <a className="dropdown-item" href="/rempresa">Empresa</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <Lema/>
        <div id="piepaginaLP" className="container-flexible bg-dark">
          <div className="row">
            <div className="col-2 h5 text-center">
              <Link to="/infoP" state={{ "tinfo": "q" }} className="custom-link">Quienes Somos</Link>
            </div>
            <div className="col-2 h5 text-center">
              <Link to="/infoP" state={{ "tinfo": "e" }} className="custom-link">Equipo</Link>
            </div>
            <div className="col-2 h5 text-center">
              <Link to="/infoP" state={{ "tinfo": "pf" }} className="custom-link">Preguntas Frecuentes</Link>
            </div>
            <div className="col-3 h5 text-center">
              <Link to="/infoP" state={{ "tinfo": "tc" }} className="custom-link">Términos y condiciones</Link>
            </div>
            <div className="col-3 h5 text-center">
              <Link to="/infoP" state={{ "tinfo": "pp" }} className="custom-link">Políticas de Privacidad</Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
