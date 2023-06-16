
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import Form from './FormE';
import ReactTable from 'react-data-table-component';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root'); // Establece el elemento de la aplicación principal
// varaible de stilo
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
        //para variar colores entre fila y fila 
        //style fila 1
        //stripedstyle fila2
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

//varaibles Necesarias para la Carga de Datos
//Aqui mi filas
const data = [
    {
    
      id:5,  
      producto: 'Quesoburguesa',
      tipo: 'Individual',
      descripcion: 'Simple pero sabroso',
    }
  ];


const InicioE = () => {
    const [filteredData, setFilteredData] = useState(data);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showModal, setShowModal] = useState(false);


      //Aqui mis columnas
    const columns = [
    {
      name: 'Nombre del producto',
      selector: row => row.producto,
      sortable: true,
    },
    {
        name: 'Tipo',
        selector: row => row.tipo,
        sortable: true,
      },
      {
        name: 'Descripcion',
        cell: (row) => (
            <button  className='btn btn-secondary' onClick={() => handleClick(row)}>
              {row.descripcion}
            </button>
          ),
        sortable: true,
      },
     ];

     const handleClick = (row) => {
        setSelectedRow(row);
        setShowModal(true);

      };
      
     
    return (
        <React.Fragment>
            {/* Navbar*/}

            <nav className="navbar navbar-expand-lg navbar-light bg-warning position-relative">
                <img id="logoStar" src={logo} alt="Logo" />
                <a className="navbar-brand" href="/">AlChilazo</a>
                <div className="h2 text-light">Inicio Empresa</div>
                <div className="btn-group d-inline-flex" data-toggle="buttons">
                    {/*aqui colocaria los link para visitar */}
                    <Link to="/emp/EmPanel" className="btn textForm text-light">Panel de control</Link>
                    <Link to="/" className="btn textForm text-light">Cerrar Sesion</Link>

                </div>
            </nav>

            
            {/* Aqui colocamos la tabla */}

            <div className="container mt-4">
                <div className="my-4">
                <ReactTable
                    title={"Lista Productos"}
                    columns={columns}
                    data={filteredData}
                    customStyles={customStyles}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                />
                </div>
            </div>

            <ReactModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Formulario"
            >
                <Form selectedRow={selectedRow} />
            </ReactModal>
        </React.Fragment>
    );
};

export default InicioE;
































