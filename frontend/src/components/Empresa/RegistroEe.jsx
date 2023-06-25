import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';
import logo from '../../images/logo copy.png';
import Formrp from './FormRP';
import { Link, useNavigate } from 'react-router-dom';
import { useMyContext } from '../../context';

const FormRe = () => {
  const navigate =  useNavigate()
  const [state, setState] = useMyContext();

  const RInicio = () =>{
      navigate("/inicioe")
  } 

  return (
    <div className="wall2">
      <nav className="navbar navbar-expand-lg navbar-light mb-3">
        <img id="logoLP" src={logo} alt="Logo" />
        <div className="h2 text-light">Registro de Producto</div>
        <button className="btn navbar-brand btnEffect btnRT text-light" onClick={() => { RInicio() }}>Regresar</button>
      </nav>

      <Formrp />
    </div>
  );
};

export default FormRe;