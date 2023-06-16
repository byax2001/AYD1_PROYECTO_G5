
import React, { useState } from 'react';
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
    nombre: 'John',
    apellido: 'Doe',
    correo: 'johndoe@example.com',
    celular: '1234567890',
    departamento: 'Departamento 1',
    municipio: 'Municipio 1',
    tipolicencia: 'Tipo A',
    tp: 'Sí',
    hojadevida: 'https://ayd1-grupo5.s3.amazonaws.com/3e62c6d4688a8135cb32ad8ba96872eced3b9a77238afe5b1169a849617e8208',
  },
  {
    nombre: 'Jane',
    apellido: 'Smith',
    correo: 'janesmith@example.com',
    celular: '9876543210',
    departamento: 'Departamento 2',
    municipio: 'Municipio 2',
    tipolicencia: 'Tipo B',
    tp: 'No',
    hojadevida: 'https://ruta-hoja-de-vida2.com/hoja-de-vida.pdf',
  },
];

const SolicitudRepartidor = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => {
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
};
  const colsUsuarios = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Apellido',
      selector: row => row.apellido,
      sortable: true,
    },
    {
      name: 'Correo Electronico',
      selector: row => row.correo,
      sortable: true,
    },
    {
      name: 'Celular',
      selector: row => row.celular,
      sortable: true,
    },
    {
      name: 'Departamento',
      selector: row => row.departamento,
      sortable: true,
    },
    {
      name: 'Municipio',
      selector: row => row.municipio,
      sortable: true,
    },
    {
      name: 'TipoLicencia',
      selector: row => row.tipolicencia,
      sortable: true,
    },
    {
      name: 'Transporte Propio',
      selector: row => row.tp,
      sortable: true,
    },
    {
      name: 'Hoja de Vida',
      selector: row=> row.hojadevida,
      cell: row => (
        <a href={row.hojadevida} target="_blank" rel="noopener noreferrer">
          <img
            src={cv}
            alt="Hoja de Vida"
            style={{ width: '35px', cursor: 'pointer' }}
          />
        </a>
      )
      
    },
    {
      name: 'Acción',
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
            title={"Solicitud de Repartidores"}
            columns={colsUsuarios}
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

export default SolicitudRepartidor;
