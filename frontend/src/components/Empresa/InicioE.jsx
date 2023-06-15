import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import ReactTable from 'react-data-table-component';

import Modal from 'react-modal';
Modal.setAppElement('#root'); 


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
    const [modalIsOpen, setModalIsOpen] = useState(false);  

    // Son lo valores que editare en ese momento:
    const [prv, setProductoValue] = useState(null);
    //const [tipoValue, setTipoValue] = useState(selectedRow.tipo);
    //const [descripcionValue, setDescripcionValue] = useState(selectedRow.descripcion);


    const openModal = () => {
        setModalIsOpen(true);
      };
      
    const closeModal = () => {
    setModalIsOpen(false);
    };

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
        cell: row => (
            <button className='btn btn-secondary' onClick={() => {
                handleActionClick(row,prv);
                openModal();
              }}>
                {row.descripcion}
              </button>
          ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
     ];

    // Esta funcion solo sirve para validar que los datos sean los correctos de cada fila
     const handleActionClick = (row,prvdd) => {
        setSelectedRow(row);
      console.log('Fila seleccionada:', row);
      console.log('Fila seleccionada:', row.id);
      console.log('nasdda: ',prvdd);
    };


        //VENTANA EMERGENTE PARA ACCIONAR 
    const ActionModal = ({ isOpen, onRequestClose }) => {
        return (
            <Modal
                isOpen={isOpen}Inicio
                onRequestClose={onRequestClose}
                contentLabel="Edicion de Producto"
            >
                <div className='container'>
                <h2>Edicion de Producto</h2>
                <p>Valores:</p>
                {/* <pre>{JSON.stringify(selectedRow, null, 2)}</pre>*/}
                
                {/*Formulario: */}

                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Producto: {selectedRow.producto}</label>
                <input id="idp" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setProductoValue(e.target.value)}></input>
                </div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Tipo: {selectedRow.tipo}</label>
                <input id="idt" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example"></input>
                </div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Descripcion: {selectedRow.descripcion}</label>
                <input id="idd" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example"></input>
                </div>
                
                <div className="row">
                <div className="col-2"></div>
                <button className='btn btn-primary col-2 btnEffect' onClick={()=>{onRequestClose(); handleActionClick(selectedRow,prv)}}>Guaradar</button>
                <div className="col-4"></div>
                <button className='btn btn-primary col-2 btnEffect' onClick={()=>{onRequestClose(); handleActionClick(selectedRow)}}>Cancelar</button>
                <div className="col-2"></div>
                </div>
                
                </div>
                </Modal>
            );
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

            {/* Aqui insertamos el model para abrir y cerrar */}
            {selectedRow && (
            <ActionModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            />
            )}
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
        </React.Fragment>
    );
};

export default InicioE;
