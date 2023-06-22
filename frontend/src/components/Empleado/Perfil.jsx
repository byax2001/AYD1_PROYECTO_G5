import React, { useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo.png';
import star from '../../images/star.png';
import { Link, useNavigate } from 'react-router-dom';
import { useMyContext } from '../../context';
import Modal from 'react-modal';
import CambioZona from './CambioZonaDepartamental';

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
      backgroundColor:"#3a3a3a",
      minHeight: '56px',
      paddingLeft: '16px',
      paddingRight: '8px',
    },
  },
    rows: {
        //para variar colores entre fila y fila 
        //style fila 1
        //stripedstyle fila2
        style: {
            backgroundColor:"#9b9b9b",
            color:"white"
        },
        stripedStyle: {
      backgroundColor: "#646464",
    },
    },
    headCells: {
        style: {
            backgroundColor:"#3a3a3a",
            color:"white"
        },
    },
   
    pagination: {
    style: {
      fontSize: '13px',
      color:'white',
      minHeight: '56px',
      backgroundColor: '#3a3a3a',
      borderTopStyle: 'solid',
      borderTopWidth: '4px',
      borderTopColor: 'd2d2d2',
    }}
};

const data = [
  {
    producto: 'Producto 1',
    fechaPedido: '2023-06-01',
    estado: 'En progreso',
  },
  {
    producto: 'Producto 2',
    fechaPedido: '2023-06-05',
    estado: 'Entregado',
  },
  // Agrega más filas según tus necesidades
];

const columns = [
  {
    name: 'Nombre del producto',
    selector: row => row.producto,
    sortable: true,
  },
  {
    name: 'Fecha de pedido',
    selector: row => row.fechaPedido,
    sortable: true,
  },
  {
    name: 'Estado',
    selector: row => row.estado,
    sortable: true,
  },
];

const Perfil = () => {
  const [state, setState] = useMyContext();
  const [filteredData, setFilteredData] = useState(data);
  const [puntuacion, setPuntuacion] = useState(3);
  const navigate=useNavigate()
  const [modalIsOpen, setModalIsOpen] = useState(false);


const openModal = () => {
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
  
};

  useEffect(() => {
    /*console.log(state)
    if(state.rol!=2){
      navigate("/")
      return
    }*/
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
  },[]);
  
  const Puntuacion_Estrellas = () => {
    const estrellas = [];
    for (let i = 0; i < puntuacion; i++) {
      estrellas.push(
        <img
          key={i}
          id="logoStar"
          className='img-thumbnail'
          src={star}
          alt="Estrella"
        />
      );
    }
    return estrellas;
  };
   //VENTANA EMERGENTE PARA ACCIONAR 

  return (
    <React.Fragment>
      <Link to={"/emp"} className='btn btn-warning btnRT text-light'>Volver a Inicio</Link>
      <nav className="navbar navbar-expand-lg navbar-light">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">MiPerfil</div>
      </nav>
      <div className="container mt-4 p-0">
        <div className='container bg-dark text-light rounded'>
          <div className="row textForm">
            <div className="col-3 h5 bg-secondary">Nombre del empleado:</div>
            <div className="col-9 h3">{/*state.data.nombre + ' ' +state.data.apellido*/}</div>
          </div>
          <div className="row textForm">
            <div className="col-3 h4"> Puntuacion: </div>
            <div className="col-9">
              {<Puntuacion_Estrellas/>}
            </div>
          </div>
          <div className="row textForm">
            <div className="col-3 h4 bg-secondary">Comisiones Generadas: </div>
            <div className="col-9"></div>
          </div>
        </div>
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Aceptar o Rechazar"
            style={customStylesModal}
          >
            <CambioZona onRequestClose={closeModal} />
          </Modal>
        )}
        <div className="my-4">
          <DataTable
            title={"Historial de pedidos"}
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination
            highlightOnHover
            striped
            responsive
          />
        </div>
        <button className="btn btn-secondary btnEffect" onClick={()=>{openModal()}}>Solicitud de cambio zona departamental</button>
      </div>
    </React.Fragment>
  );
};

export default Perfil;
