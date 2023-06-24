import React, { useState, useContext, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import ReactTable from 'react-data-table-component';
import logo from '../../images/logo copy.png';
import { Link, useNavigate} from 'react-router-dom';
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

const PedidoAsignado = () => {
  //const { infoUser, setInfoUser } = useContext(MyContext);
  const [state, setState] = useMyContext();
  const navigate=useNavigate()
  const [filteredData, setFilteredData] = useState(data);
  const [pedidoActual, setPedidoActual]=useState([{ producto: 'Producto 1',
  fechaPedido: '2023-06-01'}])

  useEffect(() => {
    console.log(state)
    if(state.rol!=2){
      navigate("/")
    }
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL PedidoAsignado DEL PROGRAMA
  },[]);


  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <DataTable
              title={"Pedido Asignado"}
              columns={columns}
              data={pedidoActual}
              customStyles={customStyles}
              highlightOnHover
              striped
              responsive
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6"></div>
          <div className="col-6">
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

export default PedidoAsignado;