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
    name: 'Orden',
    selector: row => row.NoOrden,
    sortable: true,
  },
  {
    name: 'Nombre Cliente',
    selector: row => row.nombre,
    sortable: true,
  },
  {
    name: 'Fecha de pedido',
    selector: row => String(row.fecha).substring(0, 10),
    sortable: true,
  },{
    name: 'Direccion',
    selector: row => row.direccion,
    sortable: true,
  },
  {
    name: 'Estado',
    selector: row => {
      switch (Number(row.estado)) {
        case 1: return "Disponible";
        case 2: return "En Camino";
        case 3: return "Entregado";
        case 4: return "Cancelado";
        default: return "Desconocido";
      }
    },
    sortable: true,
  },{
    name: 'Calificacion',
    selector: row => row.calificacion,
    sortable: true,
  }
];

const Perfil = () => {
  const [state, setState] = useMyContext();
  const [filtraciones, setFiltraciones] = useState([
    { ft: "Estado", idft: 1 },
    { ft: "Fecha", idft: 2 },
    { ft: "Nombre de Pedido", idft: 3 }
  ])
  
  const [testados, setTestados] = useState([
    { estado: "En Camino", nestado: 2 },
    { estado: "Desconocido", nestado: -1 },
    { estado: "Entregado", nestado: 3 },
    { estado: "Disponible", nestado: 1 },
    { estado: "Cancelado", nestado: 4 }
  ])
  const[filtroActual,setfiltroActual]=useState(0)
  const[valfiltro, setValFiltro]=useState("")
  const [filteredData, setFilteredData] = useState(data);
  const [dataRespaldo, setDataRespaldo]=useState([])
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
    getHistorial();
    console.log()
    setPuntuacion(localStorage.getItem('calificacion'))
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setfiltroActual(value)
    setFilteredData(dataRespaldo)
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
    setFilteredData(dataRespaldo) //RELLENAR LA TABLA ANTES DEL FILTRO

    if(filtroActual==0){
      alert("Escoja un Tipo de Filtrado")
      return
    }else if(valfiltro==""){
      alert('Campo del Filtro vacio o invalido')
      return
    }else if (filtroActual ==1 && valfiltro==0){
      alert('Escoja un tipo de estado')
      return
    }

    if(filtroActual==1){
      //ESTADO DEL PEDIDO
      setFilteredData(filteredData.filter(item => item.estado == valfiltro)) 
    }else if (filtroActual==2){
      //FECHA DEL PEDIDO
      setFilteredData(filteredData.filter(item => item.fecha.startsWith(valfiltro)))
    }else if (filtroActual==3){
      //NOMBRE DEL PEDIDO
      setFilteredData(filteredData.filter(item => item.NoOrden == valfiltro))
    }
    console.log(filtroActual)
  }

  //LLENAR HISTORIAL DE PEDIDOS DE USUARIO
  const getHistorial = async () => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/userdeliver/orders/${localStorage.getItem('idUser')}`;
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
      setDataRespaldo(data_res.data)
      console.log("------------------------------------------------------")
      console.log(data_res)

    } catch (e) {
      console.log(e)
    }

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
            <div className="col-9 h3">{localStorage.getItem('nombre')+' '+ localStorage.getItem('apellido')}</div>
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
                {filtroActual == 1?(
                  <select  onChange={(e)=>{setValFiltro(e.target.value)}} name="filtro" className='form-select'>
                  <option value={0}>Seleccione Estado</option>
                  {testados.map((testados) => (
                    <option key={testados.nestado} value={testados.nestado}>
                      {testados.estado}
                    </option>
                  ))}
                </select>
                ):
                filtroActual == 2 ? (
                  <input className='form-control' onChange={(e)=>{setValFiltro(e.target.value); console.log(e.target.value)}} type="date" />
                ) : (
                  <input className='form-control'
                  placeholder='Nombre Id de la Orden' 
                  onChange={(e)=>{setValFiltro(e.target.value)}} 
                  type="number" />
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
              noDataComponent={"El usuario no tiene ninguna orden realizada"}
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
