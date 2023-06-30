
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-data-table-component';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import cv from '../../../images/cv.png';
import Modal from 'react-modal';
Modal.setAppElement('#root'); 

const customStylesModal = {
    content: {
      width: '500px', // Ancho personalizado del modal
      height: '400px', // Alto personalizado del modal
      top: '50%', // Centrar verticalmente
      left: '50%', // Centrar horizontalmente
      transform: 'translate(-50%, -50%)', // Ajustar la posición al centro
    },
  };
  

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


const data = [];
  
const SolicitudCambioArea = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => {
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
  getSolicitudes();
};
const columnas = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Descripcion',
      selector: row => row.descripcion_empresa,
      sortable: true,
    },
    {
      name: 'Categoria',
      selector: row => row.nombre_tipo,
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
      name: 'Direccion',
      selector: row => row.direccion,
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
      name: 'accion_sol',
      cell: row => (
        <button className='btn btn-secondary' onClick={() => {
            setSelectedRow(row);
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
  const ActionModal = ({ isOpen, onRequestClose, aceptarSol,id,rechazarSol}) => {
    const handleAceptarSol = () => {
      aceptarSol(id);
      onRequestClose();
    };
  
    const handleRechazarSol = () => {
      rechazarSol(id);
      onRequestClose();
    };
    return (
      <Modal
        isOpen={isOpen} Inicio
        onRequestClose={onRequestClose}
        aceptarsol ={aceptarSol}
        rechazarSol={rechazarSol}
        contentLabel="Aceptar o Rechazar"
      >
        <div className='container'>
          <h2>Aceptar o Rechazar</h2>
          <p>Contenido de la fila:</p>
          <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
          <div className="row">
            <div className="col-2"></div>
            <button className='btn btn-primary col-2 btnEffect' onClick={handleAceptarSol}>Aceptar</button>
            <div className="col-4"></div>
            <button className='btn btn-primary col-2 btnEffect' onClick={handleRechazarSol}>Rechazar</button>
            <div className="col-2"></div>
          </div>
        </div>
      </Modal>
    );
  };

  const getSolicitudes = async () => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/reqPendingChangeAdress`;
    console.log(url)
    let config = {
      method: "GET", //ELEMENTOS A ENVIAR
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    };
    try {
      const res = await fetch(url, config);

      const data_res = await res.json();
      console.log("DATOS DE CAMBIO DE AREA")
      setFilteredData(data_res.data)
      console.log(data_res)


      //console.log(votoC)
      //setVotos(votoC)
    } catch (e) {
      console.log(e)
    }

  }

  //ACEPTAR SOLICITUD
  const aSolicitud = async (id) => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/aceptRequest`;
    const accion = { "id_solicitud": id}
    console.log(`------------------Id mandado a aceptar ${id}`)
    let config = {
      method: "PUT", //ELEMENTOS A ENVIAR
      body: JSON.stringify(accion),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    };
    try {
      const res = await fetch(url, config);
      const data_res = await res.json();
      console.log(data_res)
      alert(data_res.message)
      //console.log(votoC)
      //setVotos(votoC)
    } catch (e) {
      console.log(e)
    }

  }


  //RECHAZAR SOLICITUD
  const rSolicitud = async (id) => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/denyRequest`;
    const accion = { "id_solicitud": id}
    let config = {
      method: "PUT", //ELEMENTOS A ENVIAR
      body: JSON.stringify(accion),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    };
    try {
      const res = await fetch(url, config);
      const data_res = await res.json();

      console.log(data_res)
      alert(data_res.message)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    //getSolicitudes();
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
  }, []);


    return (
        <React.Fragment>
            {/* PARA MOSTRAR LA VENTANA EMERGENTE */}
            {selectedRow && (
                <ActionModal
                    isOpen={modalIsOpen}  //VARIABLE
                    onRequestClose={closeModal}  //FUNCION
                    aceptarSol={aSolicitud}  // FUNCION
                    id={selectedRow.id_solicitud_repartidor} //VARIABLE
                    rechazarSol={rSolicitud} //FUNCION
                />
            )}
            {/* CONTENEDOR DE TABLA  */}
            <div className="container mt-4">
                <ReactTable
                    title={"Solicitud de Cambio de Area de Trabajo"}
                    columns={columnas}
                    data={filteredData}
                    customStyles={customStyles}
                    pagination
                    paginationPerPage={10}
                    noDataComponent={"Sin solicitudes pendientes"}
                    highlightOnHover
                    striped
                    responsive
                />
            </div>
        </React.Fragment>
    );
};

export default SolicitudCambioArea;
