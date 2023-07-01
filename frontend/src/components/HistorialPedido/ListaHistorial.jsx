import React, { useState, useEffect } from 'react';
import ReactTable from 'react-data-table-component';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const StylesModalARPedido = {
  content: {
    width: '400px', // Ancho personalizado del modal
    height: '240px', // Alto personalizado del modal
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

function ListaHistorial() {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMDP, setShowMDP] = useState(false) //modal detalles pedido


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const ActPedidos=()=>{
    setModalIsOpen(false);
    getPedidos();
  }

  const columnas = [
    {
      name: 'No.Orden',
      selector: row => row.NoOrden,
      sortable: true,
    },
    {
      name: 'Dirección de entrega',
      selector: row => row.direccion,
      sortable: true,
    },
    {
      name: 'Metodo Pago',
      selector: row => row.metodo,
      sortable: true,
    },
    {
      name: 'Fecha de Pedido',
      selector: row => {
        const fecha = new Date(row.fecha);
        return fecha.toISOString().split('T')[0];
      },
      sortable: true,
    },
    {
      name: 'Estado',
      selector: row => row.estado,
      sortable: true,
    },
    {
      name: 'Accion',
      cell: row => (
        row.estado === "Entregado" ? (
          <button className='btn btn-secondary' onClick={() => {
            setSelectedRow(row);
            openModal();
          }}>
            Calificar
          </button>
        ) : null

      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }

  ];

  //VENTANA EMERGENTE PARA ACCIONAR 
  const ActionModal = ({ isOpen, onRequestClose, ActPedidos}) => {

    const handleAceptarSol = async (cal) => {
     // aceptarSol(id);
        const url = `${process.env.REACT_APP_API_CONSUME}/api/order/rate`;
        console.log(url)
        let config = {
          method: "PUT", //ELEMENTOS A ENVIAR
          body: JSON.stringify({
            idOrder: selectedRow.NoOrden,
            calificacion: cal
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        };
        try {
          const res = await fetch(url, config);
    
          const data_res = await res.json();
          if(data_res.valid){
            alert(data_res.msg)
          }else{
            alert(data_res.msg)
          }
        } catch (e) {
          console.log(e)
        }
        ActPedidos() //CIERRA EL MODAL Y ACTUALIZA LA TABLA DE PEDIDOS
      
    };
  
    const handleRechazarSol = () => {
     // rechazarSol(id);
     // ACA SE HARA LA PRUEBA
      onRequestClose(); //CIERRO EL MODAL
    };
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ActPedidos={ActPedidos}
        contentLabel="Aceptar o Rechazar"
        style={StylesModalARPedido}
      >
        <div className='container'>
          <div className="row justify-content-end mb-4">
            <div className="col-2">
              <button className="btn btnEffect btn-danger" onClick={() => { closeModal() }}>X</button>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2>Calificar Pedido</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-1 p-0 justify-content-start">
              <button className='btn btn-secondary btnEffect' onClick={() => handleAceptarSol(1)}>1</button>
            </div>
            <div className="col-1"></div>
            <div className="col-1 p-0 justify-content-start">
              <button className='btn btn-secondary btnEffect' onClick={() => handleAceptarSol(2)}>2</button>
            </div>
            <div className="col-1"></div>
            <div className="col-1 p-0 justify-content-start">
              <button className='btn btn-secondary btnEffect' onClick={() => handleAceptarSol(3)}>3</button>
            </div>
            <div className="col-1"></div>
            <div className="col-1 p-0 justify-content-start">
              <button className='btn btn-secondary btnEffect' onClick={() => handleAceptarSol(4)}>4</button>
            </div>
            <div className="col-1"></div>
            <div className="col-1 p-0 justify-content-start">
              <button className='btn btn-secondary btnEffect' onClick={() => handleAceptarSol(5)}>5</button>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </Modal>
    );
  };


  const getPedidos = async () => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/order/user/${localStorage.getItem('idUser')}`;
    //const url = `${process.env.REACT_APP_API_CONSUME}/api/order/user/44`;
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
      console.log(data_res.data)
      setFilteredData(data_res.data)
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    getPedidos();
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
  }, []);

  return (
    <React.Fragment>
      {/* PARA MOSTRAR LA VENTANA EMERGENTE */}
      {selectedRow && (
        <ActionModal
          isOpen={modalIsOpen}  //VARIABLE
          onRequestClose={closeModal}  //FUNCION
          ActPedidos={ActPedidos} //FUNCION PARA ACTUALIZAR PEDIDOS
        />
      )}

      <div className="container justify-content-center" >
        <div className="row">
          <div className="col-12">
            <ReactTable
              title={"Historial Pedidos"}
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

      </div>
    </React.Fragment>
  );
}

export default ListaHistorial