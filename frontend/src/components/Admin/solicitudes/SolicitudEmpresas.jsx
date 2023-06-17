
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-data-table-component';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import cv from '../../../images/cv.png';
import Modal from 'react-modal';
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


const data = [
    {
      nombre: 'Empresa 1',
      descripcion: 'Descripción de la empresa 1',
      categoria: 'Categoría 1',
      correo: 'empresa1@example.com',
      departamento: 'Departamento 1',
      zona: 'Zona 1',
      municipio: 'Municipio 1',
      documento: 'https://ejemplo.com/documento1.pdf'
    },
    {
      nombre: 'Empresa 2',
      descripcion: 'Descripción de la empresa 2',
      categoria: 'Categoría 2',
      correo: 'empresa2@example.com',
      departamento: 'Departamento 2',
      zona: 'Zona 2',
      municipio: 'Municipio 2',
      documento: 'https://ejemplo.com/documento2.pdf'
    },
    {
      nombre: 'Empresa 3',
      descripcion: 'Descripción de la empresa 3',
      categoria: 'Categoría 3',
      correo: 'empresa3@example.com',
      departamento: 'Departamento 3',
      zona: 'Zona 3',
      municipio: 'Municipio 3',
      documento: 'https://ejemplo.com/documento3.pdf'
    }
  ];
  
const SolicitudEmpresa = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => {
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
};
const columnas = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Descripcion',
      selector: row => row.descripcion,
      sortable: true,
    },
    {
      name: 'Categoria',
      selector: row => row.categoria,
      sortable: true,
    },
    {
      name: 'Correo Electronico',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Departamento',
      selector: row => row.departamento,
      sortable: true,
    },
    {
        name: 'Zona',
        selector: row => row.zona,
        sortable: true,
      },
    {
      name: 'Municipio',
      selector: row => row.nombre_municipio,
      sortable: true,
    },
    {
      name: 'Trasporte Propio',
      selector: row => row.medio_transporte,
      sortable: true,
    },
    {
      name: 'Fecha Solicitud',
      selector: row => row.fecha_solicitud,
      sortable: true,
    },
    
    {
      name: 'DocumentoPdf',
      selector: row=> row.documento,
      cell: row => (
        <a href={row.documento} target="_blank" rel="noopener noreferrer">
          <img
            src={cv}
            alt="Documento de Autenticidad"
            style={{ width: '35px', cursor: 'pointer' }}
          />
        </a>
      )
      
    },
    {
      name: 'documento',
      cell: row => (
        <button className='btn btn-secondary' onClick={() => {
            handleActionClick(row);
            openModal();
          }}>
            A/R
          </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];
  
  const handleActionClick = (row) => {
        setSelectedRow(row);
      console.log('Fila seleccionada:', row);
  };

  //VENTANA EMERGENTE PARA ACCIONAR 
  const ActionModal = ({ isOpen, onRequestClose }) => {
    return (
      <Modal
        isOpen={isOpen}Inicio
        onRequestClose={onRequestClose}
        contentLabel="Aceptar o Rechazar"
      >
        <div className='container'>
        <h2>Aceptar o Rechazar</h2>
        <p>Contenido de la fila:</p>
        <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
        <div className="row">
        <div className="col-2"></div>
        <button className='btn btn-primary col-2 btnEffect' onClick={()=>{onRequestClose(); handleActionClick(selectedRow)}}>Aceptar</button>
        <div className="col-4"></div>
        <button className='btn btn-primary col-2 btnEffect' onClick={()=>{onRequestClose(); handleActionClick(selectedRow)}}>Rechazar</button>
        <div className="col-2"></div>
        </div>
        
        </div>
          </Modal>
    );
  };
 
  const getSolicitudes = async () => {
    const url = `http://localhost:4000/api/reqPendingRestaurant`;
    let config = {
      method: "GET", //ELEMENTOS A ENVIAR
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const res = await fetch(url, config);

      const data_res = await res.json();

      console.log(data_res)
    

      //console.log(votoC)
      //setVotos(votoC)
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    getSolicitudes();
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
},[]);

  return (
    <React.Fragment>
        {/* PARA MOSTRAR LA VENTANA EMERGENTE */}
    {selectedRow && (
      <ActionModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    )}
    {/* CONTENEDOR DE TABLA  */}
      <div className="container mt-4">
        <div className="my-4">
          <ReactTable
            title={"Solicitud de Empresas"}
            columns={columnas}
            data={filteredData}
            customStyles={customStyles}
            pagination
            paginationPerPage={10}
            highlightOnHover
            striped
            responsive
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SolicitudEmpresa;
