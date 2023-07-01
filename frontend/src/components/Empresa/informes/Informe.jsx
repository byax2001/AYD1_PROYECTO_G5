import React, { useState, useEffect } from 'react';
import ReactTable from 'react-data-table-component';
import logo from './images/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import IHistorialPedidos from './IHistorialPedidos';
import IProductoMasVendido from './IProductoMasVendido';

const Informe = () => {
  const navigate = useNavigate()
  const [isReportesDropdownOpen, setIsReportesDropdownOpen] = useState(false);

  const toggleReportesDropdown = () => {
    setIsReportesDropdownOpen(!isReportesDropdownOpen);
  };

  useEffect(() => {
    if(localStorage.getItem('rol')!=3){
      navigate("/")
      return
    }
  },[])
  return (

    <div className="wall2">
      <nav className="navbar navbar-expand-lg navbar-light position-relative">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">Informe de Empresa</div>
      </nav>
      <Link to={"/inicioe"} className="btn btnEffect btn-warning btnRT">Regresar</Link>
      <div className="container mt-5">
        <div className="row">
          <div className="col-5">
            <IHistorialPedidos />
          </div>
          <div className="col-1" />
          <div className="col-6">
            <IProductoMasVendido />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informe;
