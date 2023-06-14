import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

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
      backgroundColor:"#3a3a3a",
      minHeight: '56px',
      paddingLeft: '16px',
      paddingRight: '8px',
    },
  },
    rows: {
        //para variar colores entre fila y fila 
        //style fila 1
        //stripedstyle fila2
        style: {
            backgroundColor:"#9b9b9b",
            color:"white"
        },
        stripedStyle: {
      backgroundColor: "#646464",
    },
    },
    headCells: {
        style: {
            backgroundColor:"#3a3a3a",
            color:"white"
        },
    },
   
    pagination: {
    style: {
      fontSize: '13px',
      color:'white',
      minHeight: '56px',
      backgroundColor: '#3a3a3a',
      borderTopStyle: 'solid',
      borderTopWidth: '4px',
      borderTopColor: 'd2d2d2',
    }}
};

const data = [
  {
    producto: 'Producto 1',
    fechaPedido: '2023-06-01',
  },
  {
    producto: 'Producto 2',
    fechaPedido: '2023-06-05',
  },
  // Agrega más filas según tus necesidades
];

const columns = [
  {
    name: 'Nombre del producto',
    selector: row => row.producto,
    sortable: true,
  },
  {
    name: 'Fecha de pedido',
    selector: row => row.fechaPedido,
    sortable: true,
  }
];

const Inicio = () => {
  const [filteredData, setFilteredData] = useState(data);
 
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
      
      <div className="container mt-4">
        <div className="my-4">
          <DataTable
            title={"Pedidos Actuales"}
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination
            highlightOnHover
            striped
            responsive
          />
        </div>
        <button className="btn btn-secondary btnEffect">Solicitud de cambio zona departamental</button>
      </div>
    </React.Fragment>
  );
};

export default Inicio;
