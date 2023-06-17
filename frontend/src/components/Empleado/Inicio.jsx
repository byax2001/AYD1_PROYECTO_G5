import React, { useState, useContext, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import MyContext from '../../context';

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
  },
  {
    producto: 'Producto 2',
    fechaPedido: '2023-06-11',
  },
  {
    producto: 'Producto 3',
    fechaPedido: '2023-06-12',
  }
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
  }
];

const Inicio = () => {
  //const { infoUser, setInfoUser } = useContext(MyContext);
  const { infoUser } = useContext(MyContext);
  const [filteredData, setFilteredData] = useState(data);
  const [pedidoActual, setPedidoActual]=useState([{ producto: 'Producto 1',
  fechaPedido: '2023-06-01'}])

  useEffect(() => {
   console.log(infoUser)
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
},[]);


  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning position-relative">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">Inicio</div>
        <div className="btn-group d-inline-flex" data-toggle="buttons">
          <Link to="/emp/Miperfil" className="btn textForm text-light">Miperfil</Link>
          <Link to="/" className="btn textForm text-light">Cerrar Sesion</Link>
        
        </div>
      </nav>
      
      <div className="container">
        <div className="row">
        <div className="my-4 col-7">
          <DataTable
            title={"Pedidos Pendientes"}
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination
            highlightOnHover
            striped
            responsive
          />
        </div>
        <div className='my-4 col-5'>
        <DataTable
            title={"Pedidos Actuales"}
            columns={columns}
            data={pedidoActual}
            customStyles={customStyles}
            highlightOnHover
            striped
            responsive
          />
          <div className="btn-group d-inline-flex" data-toggle="buttons">
          <button className="btnEffect btn btn-secondary">Entregado</button>
          <button className="btnEffect btn btn-secondary">Cancelado</button>
        
        </div>

        </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Inicio;