import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';
import logo from '../../images/logo.png';
import Formrp from './FormRP';



const FormRe = () => {


  return (

    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light mb-3">
        <img id="logoLP" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/inicioe">Inicio</a>
        <div className="h2 text-light">Registro de Producto</div>
      </nav>

      <Formrp/>
      

     

    </React.Fragment>
    
  );
};

export default FormRe;