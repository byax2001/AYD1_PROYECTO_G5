import React, { useState,useEffect } from 'react';
import ReactTable from 'react-data-table-component';
import logo from '../images/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import PedidosEntregados from './PedidosEntregados';
import Top5Dev from './Top5Deliverys';



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
      <nav className="navbar navbar-expand-lg navbar-light position-relative">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">Informe de Repartidores</div>
      </nav>
      <Link to={"/adm"} className="btn btnEffect btn-warning btnRT">Regresar</Link>
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <PedidosEntregados/>
          </div>
          <div className="col-1"></div>
          <div className="col-5">
            <Top5Dev/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Informe;
