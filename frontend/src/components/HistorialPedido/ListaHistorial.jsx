import React, { useState, useEffect } from 'react';
import ReactTable from 'react-data-table-component';
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

const data = [];

function ListaHistorial() {
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
          name: 'Municipio',
          selector: row => row.municipio,
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
      
      
  const getPedidos = async () => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/order/user/${localStorage.getItem('idUser')}`;
    console.log(url)
    let config = {
      method: "GET", //ELEMENTOS A ENVIAR
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //authorization : localStorage.getItem('token')
      },
    };
    try {
      const res = await fetch(url, config);

      const data_res = await res.json();

      setFilteredData(data_res.data)
    } catch (e) {
      console.log(e)
    }

  }


  return (
    <div className="container">
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
  )
}

export default ListaHistorial