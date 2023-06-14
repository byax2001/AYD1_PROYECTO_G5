import React, { useState } from 'react';
import ReactTable from 'react-data-table-component';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import cv from '../../images/cv.png';
import Modal from 'react-modal';
import SolicitudEmpresa from './solicitudes/SolicitudEmpresas';
import SolicitudRepartidor from './solicitudes/SolicitudRepartidores';

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

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning position-relative">
                <img id="logoStar" src={logo} alt="Logo" />
                <a className="navbar-brand" href="/">AlChilazo</a>
                <div className="h2 text-light">Inicio</div>
                <div className="btn-group d-inline-flex" data-toggle="buttons">
                    <Link to="/emp/Miperfil" className="btn textForm text-light">Miperfil</Link>
                    <Link to="/" className="btn textForm text-light">Cerrar Sesion</Link>
                </div>
            </nav>
            <div className='d-inline-flex btnRT'>
                <div className="btn-group">
                    <Link className="btn btn-warning btnEffect">Cerrar Sesion</Link>
                    <Link className="btn btn-warning btnEffect">Reportes</Link>
                </div>
            </div>
            {/* TABLAS */}
            <div className="container mt-4">
                <div className="my-4">
                    <SolicitudRepartidor />
                </div>
                <div className="my-4">
                    <SolicitudEmpresa />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Inicio;
