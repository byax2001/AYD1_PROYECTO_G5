
import React, { useState,useEffect} from 'react';
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
    getSolicitudes();
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
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Telefono',
      selector: row => row.telefono,
      sortable: true,
    },
    {
      name: 'Departamento',
      selector: row => row.departamento,
      sortable: true,
    },
    {
      name: 'Municipio',
      selector: row => row.nombre_municipio,
      sortable: true,
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
    },
    {
      name: 'Hoja de Vida',
      selector: row => row.documento,
      cell: row => (
        <a href={row.documento} target="_blank" rel="noopener noreferrer">
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
    getSolicitudes();
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
  }, []);
  //ACEPTAR SOLICITUD
  const aSolicitud = async (id) => {
    console.log(localStorage.getItem('token'))
    const url = `${process.env.REACT_APP_API_CONSUME}/api/aceptRequest`;
    const accion = { "id_solicitud": id }
    console.log(`------------------Id mandado a aceptar ${id}`)
    let config = {
      method: "PUT", //ELEMENTOS A ENVIAR
      body: JSON.stringify(accion),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization : localStorage.getItem('token')
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
        <div className="my-4">
          <ReactTable
            title={"Solicitud de Repartidores"}
            noDataComponent={"Sin solicitudes pendientes"}
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
