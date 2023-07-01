
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
      height: '230px', // Alto personalizado del modal
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
};

const onRequestClose = ()=>{
  setModalIsOpen(false);
  getSolicitudes();
}


const columnas = [
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
      name: 'Municipio Antiguo',
      selector: row => row.municipioantiguo,
      sortable: true,
    },
    {
      name: 'Municipio Nuevo',
      selector: row => row.municipionuevo,
      sortable: true,
    },
    {
      name: 'Direccion Antigua',
      selector: row => row.direccionantigua,
      sortable: true,
    },
    {
      name: 'Direccion Nueva',
      selector: row => row.direccionnueva,
      sortable: true,
    },
    {
      name: 'Accion',
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
  const ActionModal = ({ isOpen, onRequestClose,closeModal, aceptarSol,id,rechazarSol}) => {
    const handleAceptarSol = async() => {
      await aceptarSol(id);
      onRequestClose()
    };
  
    const handleRechazarSol = async() => {
      await rechazarSol(id);
      onRequestClose()
    };
    return (
      <Modal
        isOpen={isOpen} Inicio
        onRequestClose={onRequestClose}  //FUNCION
        closeModal = {closeModal}  //FUNCION
        aceptarsol ={aceptarSol}
        rechazarSol={rechazarSol}
        contentLabel="Aceptar o Rechazar"
        style={customStylesModal}
      >
        <div className='container-fluid'>
          <div className="row justify-content-end mb-4">
            <div className="col-2">
              <button className="btn btnEffect btn-danger" onClick={()=>{closeModal()}}>X</button>
            </div>
          </div>
          <div className="row justify-content-center mb-4">
            <div className="col-12 text-center ">
            <h2>Aceptar o Rechazar</h2>
            </div>
          </div>
          
          <div className="row">
            <div className="col-2"></div>
            <button className='btn btn-primary col-3 btnEffect' onClick={handleAceptarSol}>Aceptar</button>
            <div className="col-2"></div>
            <button className='btn btn-primary col-3 btnEffect' onClick={handleRechazarSol}>Rechazar</button>
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
      console.log(data_res.data)
      console.log(filteredData)


      //console.log(votoC)
      //setVotos(votoC)
    } catch (e) {
      console.log(e)
    }

  }

  //ACEPTAR SOLICITUD
  const aSolicitud = async (id) => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/aceptRequestCAdress`;
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
      alert(data_res.msg)
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
    getSolicitudes();
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
  }, []);


    return (
        <React.Fragment>
            {/* PARA MOSTRAR LA VENTANA EMERGENTE */}
            {selectedRow && (
                <ActionModal
                    isOpen={modalIsOpen}  //VARIABLE
                    onRequestClose={onRequestClose}  //FUNCION
                    closeModal = {closeModal}  //FUNCION
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
