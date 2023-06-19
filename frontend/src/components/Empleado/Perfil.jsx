import React, { useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo.png';
import star from '../../images/star.png';
import { Link, useNavigate } from 'react-router-dom';
import { useMyContext } from '../../context';


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
  const [puntuacion, setPuntuacion] = useState(5);
  const navigate=useNavigate()

  useEffect(() => {
    console.log(state)
    if(state.rol!=2){
      navigate("/")
      return
    }
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
  },[]);

  return (
    <React.Fragment>
      <Link to={"/emp"} className='btn btn-warning btnRT text-light'>Volver a Inicio</Link>
      <nav className="navbar navbar-expand-lg navbar-light">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">MiPerfil</div>
      </nav>
      <div className="container mt-4">
        <div className='container bg-dark text-light rounded'>
          <div className="row textForm">
            <div className="col-3 h5 bg-secondary">Nombre del empleado:</div>
            <div className="col-9 h3">{state.data.nombre + ' ' +state.data.apellido}</div>
          </div>
          <div className="row textForm">
            <div className="col-3 h4"> Puntuacion: </div>
              <img id="logoStar" className='img-thumbnail' src={star} />
              <img id="logoStar" className='img-thumbnail' src={star} />
              <img id="logoStar" className='img-thumbnail' src={star} />
              <img id="logoStar" className='img-thumbnail' src={star} />
              <img id="logoStar" className='img-thumbnail' src={star} />
          </div>
        </div>

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
        <button className="btn btn-secondary btnEffect">Solicitud de cambio zona departamental</button>
      </div>
    </React.Fragment>
  );
};

export default Perfil;
