import React, { useState, useEffect } from 'react';
import ReactTable from 'react-data-table-component';
import logo from '../../images/logo copy.png';
import { Link,useNavigate } from 'react-router-dom';
import cv from '../../images/cv.png';
import Modal from 'react-modal';
import SolicitudEmpresa from './solicitudes/SolicitudEmpresas';
import SolicitudRepartidor from './solicitudes/SolicitudRepartidores';
import SolicitudCambioArea from './solicitudes/SolicitudCambioArea';
Modal.setAppElement('#root'); 

const customStyles = {
  noData: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#a2a2a2',
    },
  },
  header: {
    style: {
      justifyContent: 'center',
      fontSize: '22px',
      color: 'white',
      backgroundColor: "#3a3a3a",
      minHeight: '56px',
      paddingLeft: '16px',
      paddingRight: '8px',
    },
  },
  rows: {
    style: {
      backgroundColor: "#9b9b9b",
      color: "white"
    },
    stripedStyle: {
      backgroundColor: "#646464",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#3a3a3a",
      color: "white"
    },
  },
  pagination: {
    style: {
      fontSize: '13px',
      color: 'white',
      minHeight: '56px',
      backgroundColor: '#3a3a3a',
      borderTopStyle: 'solid',
      borderTopWidth: '4px',
      borderTopColor: 'd2d2d2',
    }
  }
};



const Inicio = () => {
  const navigate = useNavigate()
  const [isReportesDropdownOpen, setIsReportesDropdownOpen] = useState(false);

  const toggleReportesDropdown = () => {
    setIsReportesDropdownOpen(!isReportesDropdownOpen);
  };

  useEffect(()=>{
    if(localStorage.getItem('rol')!=0){
      navigate("/")
    }

  },[])

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light position-relative">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">Inicio</div>
      </nav>
      <div className='d-inline-flex btnRT'>
        <div className="btn-group">
          {/* DROPDOWN DE REGISTRARSE*/}
          <li className="nav-item dropdown btn btnEffect">
            <button className="nav-link dropdown-toggle" id="navbarDropdown1" role="button" onClick={toggleReportesDropdown}>Reportes</button>
            <div className={`dropdown-menu ${isReportesDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown1">
              <Link to={"/infV"} className="dropdown-item">Ventas</Link>
              <Link to={'/infR'} className="dropdown-item">Repartidores</Link>
              <Link to={'/infU'} className="dropdown-item">Usuarios</Link>
            </div>
          </li>
          {/* */}
          <Link to={"/adm/users"} className="btn btnEffect">Administrar Usuarios</Link>
          <Link to={"/"} className="btn btnEffect">Cerrar Sesion</Link>
        </div>
      </div>
      {/* TABLAS */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <SolicitudRepartidor />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <SolicitudEmpresa />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <SolicitudCambioArea/>
          </div>
        </div>
        
      </div>
    </React.Fragment>
  );
};

export default Inicio;
