import React, { useState } from 'react';
import ReactTable from 'react-data-table-component';
import logo from './images/Logo.png';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import DeshabilitarMantenerUsuario from './DeshabilitarMantenerUsuario';


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



const AdministracionDeUsuarios = () => {
  const [isReportesDropdownOpen, setIsReportesDropdownOpen] = useState(false);

  const toggleReportesDropdown = () => {
    setIsReportesDropdownOpen(!isReportesDropdownOpen);
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light position-relative">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">Administracion De Usuarios</div>
      </nav>
      <div className='d-inline-flex btnRT'>
        <div className="btn-group">
          <Link to={"/adm"} className="btn btnEffect">Regresar</Link>
        </div>
      </div>
      {/* TABLAS */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <DeshabilitarMantenerUsuario/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdministracionDeUsuarios;
