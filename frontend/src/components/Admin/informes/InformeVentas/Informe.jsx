import React, { useState, useEffect } from 'react';
import ReactTable from 'react-data-table-component';
import logo from '../images/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Top5Emp from './Top5emp';
import TopProductos from './TopProductos';
import Vventas from './Vventas';



const Informe = () => {
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
      <div className="wall2">
      <nav className="navbar navbar-expand-lg navbar-light position-relative">
        <img id="logoStar" src={logo} alt="Logo" />
        <div className="navbar-brand">AlChilazo</div>
        <div className="h2 text-light">Informe de Ventas</div>
      </nav>
      <Link to={"/adm"} className="btn btnEffect btn-warning btnRT">Regresar</Link>
      <div className='container mt-3'>
        <div className="row mb-3">
          <div className="col-2"></div>
          <div className="col-8">
            {/* TABLA VALOR DE VENTAS */}
            <Vventas />

          </div>
          <div className="col-2"></div>
        </div>
        <div className="row mt-2">
          {/* TOP 5 EMPRESAS */}
          <div className="col-3"/>
          <div className="col-6 d-flex justify-content-center bg-dark" style={{ height: '300px' }}>
            <Top5Emp />
          </div>
          <div className="col-3"/>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            {/* TABLA PRODUCTOS MAS VENDIDOS */}
            <TopProductos />
          </div>
        </div>


      </div>
      </div>
      
    </React.Fragment>
  );
};

export default Informe;
