import React, { useState,useEffect} from 'react';
import ReactTable from 'react-data-table-component';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import cv from '../../../images/cv.png';
import Modal from 'react-modal';
Modal.setAppElement('#root'); 

const customStylesModal = {
    content: {
      width: '500px', // Ancho personalizado del modal
      height: '200px', // Alto personalizado del modal
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
      color: "white",
      //minHeight: '300px'
      fontSize: "14px"
      
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
    email: 'johndoe@example.com',
    celular: '1234567890',
    departamento: 'Departamento 1',
    municipio: 'Municipio 1',
    tipolicencia: 'Tipo A',
    tp: 'Sí',
    documento: 'https://ayd1-grupo5.s3.amazonaws.com/3e62c6d4688a8135cb32ad8ba96872eced3b9a77238afe5b1169a849617e8208',
  },
  {
    nombre: 'Jane',
    apellido: 'Smith',
    email: 'janesmith@example.com',
    celular: '9876543210',
    departamento: 'Departamento 2',
    municipio: 'Municipio 2',
    tipolicencia: 'Tipo B',
    tp: 'No',
    documento: 'https://ruta-hoja-de-vida2.com/hoja-de-vida.pdf',
  },
];

const DeshabilitarUsuario = () => {
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
  const colsUsuarios = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
      width: "110px"
    },
    {
      name: 'Apellido',
      selector: row => row.apellido,
      sortable: true,
      width: "110px"
    },
    {
      name: 'Correo Electronico',
      selector: row => row.email,
      sortable: true,
      style: { whiteSpace: 'nowrap' } ,
      width: "180px" ,                      // added line here
        HeaderStyle: (selector, id) => {
    return { textAlign: "center" };   // removed partial line here
  },
    },
    {
      name: 'Telefono',
      selector: row => row.telefono,
      sortable: true,
      width: "110px"
    },
    {
      name: 'Departamento',
      selector: row => row.departamento,
      sortable: true,
      width: "150px"
    },
    {
      name: 'Municipio',
      selector: row => row.nombre_municipio,
      sortable: true,
      width: "130px"
    },
    {
      name: 'Licencia',
      selector: row => row.tipo_licencia,
      sortable: true,
    },
    {
      name: 'Transporte Propio',
      selector: row => row.medio_transporte,
      sortable: true,
      width: "180px"
    },
    {
      name: 'Documento',
      selector: row => row.documento,
      cell: row => (
        <a className='' href={row.documento} target="_blank" rel="noopener noreferrer">
          <img
            src={cv}
            alt="Hoja de Vida"
            style={{ width: '35px', cursor: 'pointer' }}
          />
        </a>
      ),
      width: "110px"

    },
    {
      name: 'Acción',
      cell: row => (
        <button className='btn btn-secondary' onClick={() => {
          handleActionClick(row);
          openModal();
        }}>
          D/M
        </button>
      ),
      width: "120px",
      style: { whiteSpace: 'nowrap'} ,
      // style: { whiteSpace: 'nowrap',height:'22px', width: '300px', backgroundColor:"red"} ,
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
      //aceptarSol(id);
      onRequestClose();
    };
  
    const handleRechazarSol = () => {
      //rechazarSol(id);
      onRequestClose();
    };
      return (
          <Modal
              isOpen={isOpen} Inicio
              onRequestClose={onRequestClose}
              aceptarsol={aceptarSol}
              rechazarSol={rechazarSol}
              contentLabel="Aceptar o Rechazar"
              style={customStylesModal}
          >
              <div className='container'>
                  <div className="row mb-4">
                      <div className="col-12 text-center"><h3>Deshabilitar Usuario o Dar Mantenimiento</h3></div>
                  </div>
                  <div className="row">
                      <div className="row">
                          <div className="col-1"/>
                          <div className="col-3 p-0">
                              <button className='btn btn-secondary btnEffect' onClick={handleAceptarSol}>Deshabilitar</button>
                          </div>
                          <div className="col-4">
                             <button className="btn btn-secondary btnEffect">Mantenimiento</button>
                          </div>
                          <div className="col-3 p-0 justify-content-end d-flex">
                              <button className='btn btn-secondary btnEffect' onClick={handleRechazarSol}>Cancelar</button>
                          </div>
                          <div className="col-1"/>
                      </div>
                  </div>
              </div>
          </Modal>
      );
  };

  const getSolicitudes = async () => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/reqPendingDelivers`;
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
      setFilteredData(data_res.data)
      console.log(data_res)
      //console.log(votoC)
      //setVotos(votoC)
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    //getSolicitudes();
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
  }, []);
  //ACEPTAR SOLICITUD
  const aSolicitud = async (id) => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/aceptRequest`;
    const accion = { "id_solicitud": id }
    console.log(`------------------Id mandado a aceptar ${id}`)
    let config = {
      method: "PUT", //ELEMENTOS A ENVIAR
      body: JSON.stringify(accion),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
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
    const accion = { "id_solicitud": id }
    let config = {
      method: "PUT", //ELEMENTOS A ENVIAR
      body: JSON.stringify(accion),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
  return (
    <React.Fragment>
      {/* PARA MOSTRAR LA VENTANA EMERGENTE */}
      {selectedRow && (
        <ActionModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          aceptarSol={aSolicitud}  // FUNCION
          id={selectedRow.id_solicitud_repartidor} //VARIABLE
          rechazarSol={rSolicitud} //FUNCION
        />
      )}
      {/* CONTENEDOR DE TABLA  */}
          <div className="container mt-4">
              <div className="row">
                  <div className="col-12">
                      <ReactTable
                          title={"Deshabilitar Usuarios  o Dar Mantenimiento"}
                          columns={colsUsuarios}
                          data={data}
                          customStyles={customStyles}
                          pagination
                          paginationPerPage={10}
                          highlightOnHover
                          striped
                          responsive
                      />
                  </div>
          
        </div>
      </div>
    </React.Fragment>
  );
};

export default DeshabilitarUsuario;
