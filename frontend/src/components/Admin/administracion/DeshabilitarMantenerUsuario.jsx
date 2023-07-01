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
      height: '350px', // Alto personalizado del modal
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



const DeshabilitarUsuario = () => {
  const [filteredData, setFilteredData] = useState([]);
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
      sortable: true
    },
    {
      name: 'Apellido',
      selector: row => row.apellido,
      sortable: true,
      grow: 2
    }, {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      grow: 2
    }, {
      name: 'UserName',
      selector: row => row.username,
      sortable: true
    }, {
      name: 'Telefono',
      selector: row => row.telefono,
      sortable: true
    }, {
      name: 'Tipo de Licencia',
      selector: row => row.tipo_licencia,
      sortable: true
    },{
      name:'Nit',
      selector: row => row.nit,
      sortable:true
    },{
      name:'Rol',
      selector: row => row.rol,
      sortable:true
    },
    {
      name:'Fecha Registro',
      selector: row => row.fecha_registro,
      sortable:true
    },
    {
      name:'Estado',
      selector: row => row.estado,
      sortable:true
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
  const ActionModal = ({ isOpen, onRequestClose, BanMantenerU,id, getInfo}) => {
    const [valTextA, setValTextA]=useState("")
    const Manenimiento = () => {
      //aceptarSol(id);
      BanMantenerU(2,id,valTextA)
      getInfo()
      onRequestClose();
    };
  
    const Baneo = () => {
      //rechazarSol(id);
      BanMantenerU(1,id,valTextA)
      getInfo()
      onRequestClose();
    };
    return (
      <Modal
        isOpen={isOpen} Inicio
        onRequestClose={onRequestClose}
        BanMantenerU={BanMantenerU}
        contentLabel="Aceptar o Rechazar"
        style={customStylesModal}
      >
        <div className='container'>
          <div className="row mb-4">
            <div className="col-12 text-center"><h3>Deshabilitar Usuario o Dar Mantenimiento</h3></div>
          </div>
          <div className="row mb-4">
            <textarea
              onChange={(e)=>{setValTextA(e.target.value)}}
              placeholder='Ingrese motivo de su decision'
              className='container-fluid form-control'
              rows="3">{valTextA}</textarea>
          </div>
          <div className="row">
            <div className="row">
              <div className="col-1" />
              <div className="col-3 p-0">
                <button className='btn btn-secondary btnEffect' onClick={Baneo}>Deshabilitar</button>
              </div>
              <div className="col-4">
                <button className="btn btn-secondary btnEffect" onClick={Manenimiento}>Mantenimiento</button>
              </div>
              <div className="col-3 p-0 justify-content-end d-flex">
                <button className='btn btn-secondary btnEffect' onClick={()=>{onRequestClose()}}>Cancelar</button>
              </div>
              <div className="col-1" />
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  

  useEffect(() => {
    getInfo()
    //getSolicitudes();
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
  }, []);

  //LLENAR LA TABLA CON LOS USUARIOS
  const getInfo = async (departamento) => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/reports`;
    let config = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    };
    
    try {
      const res = await fetch(url, config);
      const data_res = await res.json();
      console.log("#$$$$$$$$$$$$$$$$$$$$$$######")
      console.log(data_res)
      setFilteredData(data_res.data)
    } catch (e) {
      console.log(e)
    }

  }



  //ACEPTAR SOLICITUD
  const BanMantU = async (bm,id,motivo) => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/user/ban`;
    const accion = { tipoban:Number(bm),id:id,descripcion:motivo}
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


  
  return (
    <React.Fragment>
      {/* PARA MOSTRAR LA VENTANA EMERGENTE */}
      {selectedRow && (
        <ActionModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          BanMantenerU={BanMantU}  // FUNCION
          id={selectedRow.id_usuario} //VARIABLE
          getInfo={getInfo}
        />
      )}
      {/* CONTENEDOR DE TABLA  */}
          <div className="container mt-4">
              <div className="row">
                  <div className="col-12">
                      <ReactTable
                          title={"Deshabilitar Usuarios  o Dar Mantenimiento"}
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
      </div>
    </React.Fragment>
  );
};

export default DeshabilitarUsuario;
