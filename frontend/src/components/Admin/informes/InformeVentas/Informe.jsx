import React, { useState } from 'react';
import ReactTable from 'react-data-table-component';
import logo from '../images/Logo.png';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Top5Emp from './Top5emp';
import TopProductos from './TopProductos';
import Vventas from './Vventas';



const Informe = () => {
  const [isReportesDropdownOpen, setIsReportesDropdownOpen] = useState(false);

  const toggleReportesDropdown = () => {
    setIsReportesDropdownOpen(!isReportesDropdownOpen);
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light position-relative">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">Informe de Ventas</div>
      </nav>
      <Link to={"/adm"} className="btn btnEffect btn-warning btnRT">Regresar</Link>
      <div className='container mt-3'>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            {/* TABLA VALOR DE VENTAS */}
            <Vventas />

          </div>
          <div className="col-2"></div>
        </div>
        <div className="row mt-2">
          <div className="col-5">
            {/* TABLA PRODUCTOS MAS VENDIDOS */}
            <TopProductos />
          </div>
          <div className="col-1"></div>
          <div className="col-6 bg-dark">
            {/* BARRA PARA LAS VENTAS */}
            <Top5Emp />

          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Informe;
