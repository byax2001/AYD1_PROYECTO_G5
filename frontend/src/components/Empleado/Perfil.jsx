import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo copy.png';
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
      backgroundColor: "#3a3a3a",
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
  const [filtraciones, setFiltraciones]=useState([
    {ft:"Estado",idft:1},
    {ft:"Fecha",idft:2},
    {ft:"Nombre de Pedido",idft:3}
  ])
  const[filtroActual,setfiltroActual]=useState(0)
  const[valfiltro, setValFiltro]=useState("")
  const [filteredData, setFilteredData] = useState(data);
  const [puntuacion, setPuntuacion] = useState(3);
  const navigate = useNavigate()
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
  }, []);
  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setfiltroActual(value)
    if(value==0){
      setValFiltro("")
    }
  };

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
  const filtrar = async()=>{
    if(filtroActual==0){
      alert("Escoja un Tipo de Filtrado")
      return
    }else if(valfiltro==""){
      alert('Campo del Filtro no puede ir vacio')
      return
    }
    console.log(filtroActual)
  }

  return (
    <React.Fragment>
      <div className="wall3">
      <Link to={"/emp"} className='btn btn-warning btnRT text-light'>Volver a Inicio</Link>
      <nav className="navbar navbar-expand-lg navbar-light opacity-75">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">MiPerfil</div>
      </nav>
      <div className="container mt-4 p-0">
        <div className='container  text-light rounded'>
          <div className="row textForm">
            <div className="col-3 h5">Nombre del empleado:</div>
            <div className="col-9 h3">{/*state.data.nombre + ' ' +state.data.apellido*/}</div>
          </div>
          <div className="row textForm">
            <div className="col-3 h4"> Puntuacion: </div>
            <div className="col-9">
              {<Puntuacion_Estrellas />}
            </div>
          </div>
          <div className="row textForm">
            <div className="col-3 h4">Comisiones Generadas: </div>
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
        <div className="row mt-3">
          <div className="col-3"></div>
          <div className="col-4">
            <select onChange={handleChange} name="filtro" className='form-select'>
              <option value={0}>Seleccione Tipo de Filtro</option>
              {filtraciones.map((filtracion) => (
                <option key={filtracion.idft} value={filtracion.idft}>
                  {filtracion.ft}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2 p-0">
                <button className="btn btnEffect btn-secondary" onClick={()=>{filtrar()}}>Filtrar</button>
          </div>
          <div className="col-3"></div>
        </div>
        <div className="row mt-2">
          <div className="col-3"></div>
          <div className="col-4">
            {filtroActual != 0 && (
              <div className="">
                {filtroActual == 2 ? (
                  <input className='form-control' onChange={(e)=>{setValFiltro(e.target.value); console.log(e.target.value)}} type="date" />
                ) : (
                  <input className='form-control' onChange={(e)=>{setValFiltro(e.target.value)}} type="text" />
                )}
              </div>
            )}
          </div>

        </div>
        <div className="row d-flex">
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
        </div>


        <button className="btn btn-secondary btnEffect" onClick={() => { openModal() }}>Solicitud de cambio zona departamental</button>
      </div>
      </div>
      
    </React.Fragment>
  );
};

export default Perfil;
