import React, { useState, useEffect } from 'react';
import ReactTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
Modal.setAppElement('#root'); 


const StylesModalARPedido = {
    content: {
      width: '400px', // Ancho personalizado del modal
      height: '175px', // Alto personalizado del modal
      top: '50%', // Centrar verticalmente
      left: '50%', // Centrar horizontalmente
      transform: 'translate(-50%, -50%)', // Ajustar la posición al centro
    },
  
};

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


const data = [ {
    nombre: 'John',
    apellido: 'Doe',
    pedido: 'Pizza',
    email: 'johndoe@example.com',
    telefono: '123456789',
    departamento: 'Departamento 1',
    zona: 'Zona 1',
    nombre_municipio: 'Municipio 1',
    direccion: 'Calle 123',
    fecha_solicitud: '2023-06-01',
  }
];
  
const PedidosPendientes = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMDP, setShowMDP] = useState(false) //modal detalles pedido

const openMPedidos = ()=>{
    setShowMDP(true)
}
const closeMPedidos=() =>{
    setShowMDP(false)
}
const openModal = () => {
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
  //getSolicitudes();
};
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
      name: 'Pedido',
      selector: row => row.pedido,
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
      name: 'Direccion',
      selector: row => row.direccion,
      sortable: true,
    },
    {
      name: 'Fecha de Pedido',
      selector: row => row.fecha_solicitud,
      sortable: true,
    },
    {
      name: 'Detalles',
      cell: row => (
        <button className='btn btn-secondary' onClick={() => {
            setSelectedRow(row);
            openMPedidos();
          }}>
            Detalles
          </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Accion',
      cell: row => (
        <button className='btn btn-secondary' onClick={() => {
            setSelectedRow(row);
            openModal();
          }}>
            Asignar
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
     // aceptarSol(id);
      onRequestClose();
    };
  
    const handleRechazarSol = () => {
     // rechazarSol(id);
      onRequestClose();
    };
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        aceptarsol ={aceptarSol}
        rechazarSol={rechazarSol}
        contentLabel="Aceptar o Rechazar"
        style={StylesModalARPedido}
      >
         <div className='container'>
                <div className="row mb-4">
                    <div className="col-12 text-center">
                        <h2>Asignarse Pedido</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-3 p-0 justify-content-start">
                        <button className='btn btn-secondary btnEffect' onClick={handleAceptarSol}>Asignarme</button>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-3">
                        <button className='btn btn-secondary btnEffect' onClick={handleRechazarSol}>Cancelar</button>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
      </Modal>
    );
  };

  const DetallesPedido = ({isOpen, openModal, closeModal, aceptarSol,id,rechazarSol}) => {
    const handleAceptarSol = () => {
     // aceptarSol(id);
      closeModal();
    };
  
    const handleRechazarSol = () => {
     // rechazarSol(id);
      closeModal();
    };
    return (
      <Modal
        isOpen = {isOpen}
        openModal = {openModal}
        closeModal = {closeModal}
        aceptarsol ={aceptarSol}
        rechazarSol={rechazarSol}
        contentLabel="Detalles de Pedido"
        style={customStylesModal}
      >
            <div className='container'>
                <div className="row justify-content-end">
                    <div className="col-1 ">
                        <button className='btn btn-danger btnEffect' onClick={handleAceptarSol}>X</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <h2>Detalles de Pedido</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <textarea name="" id="" className='col-12 form-control' rows="10"></textarea>
                    </div>
                </div>
            </div>
      </Modal>
    );
  };

  const getSolicitudes = async () => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/reqPendingRestaurant`;
    console.log(url)
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
    const accion = { "id_solicitud": id}
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
        onRequestClose={closeModal}  //FUNCION
        aceptarSol = {aSolicitud}  // FUNCION
        id = {selectedRow.id_solicitud_repartidor} //VARIABLE
        rechazarSol= {rSolicitud} //FUNCION
      />
    )}
    {showMDP && (
      <DetallesPedido
        isOpen={showMDP}
        openModal={openMPedidos}  //VARIABLE
        closeModal={closeMPedidos}  //FUNCION
        aceptarSol = {aSolicitud}  // FUNCION
        id = {selectedRow.id_solicitud_repartidor} //VARIABLE
        rechazarSol= {rSolicitud} //FUNCION
      />
    )}
    {/* CONTENEDOR DE TABLA  */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ReactTable
              title={"Pedidos Disponibles"}
              columns={columnas}
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

export default PedidosPendientes;
