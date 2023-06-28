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

const data = [];

const columns = [
  {
    name: 'NoOrden',
    selector: row => row.NoOrden,
    sortable: true,
  },
  {
    name: 'Fecha de pedido',
    selector: row => {
      const fecha = new Date(row.fecha);
      return fecha.toISOString().split('T')[0];
    },
    sortable: true,
  }
];


const PedidoAsignado = () => {
  //const { infoUser, setInfoUser } = useContext(MyContext);
  const navigate=useNavigate()
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    getSolicitudesactivas()
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL PedidoAsignado DEL PROGRAMA
  }, []);

  async function getSolicitudesactivas() {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/order/actual/${localStorage.getItem('idUser')}`;
    let config = {
      method: "GET", //ELEMENTOS A ENVIAR
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization : localStorage.getItem('token')
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

  const handleEntregarPedido = async () => {
    // aceptarSol(id);
       const url = `${process.env.REACT_APP_API_CONSUME}/api/order/deliver`;
       let config = {
         method: "PUT", //ELEMENTOS A ENVIAR
         body: JSON.stringify({
           idUser: localStorage.getItem('idUser'),
           idpedido: filteredData[0].NoOrden
         }),
         headers: {
           "Content-Type": "application/json",
           Accept: "application/json",
           authorization : localStorage.getItem('token')
         },
       };
       try {
         const res = await fetch(url, config);
   
         const data_res = await res.json();
         if(data_res.valid){
           alert(data_res.message)
         }else{
           alert(data_res.message)
         }
       } catch (e) {
         console.log(e)
       }

      getSolicitudesactivas()
  
   };

   const handleCancelPedido = async () => {
    // aceptarSol(id);
       const url = `${process.env.REACT_APP_API_CONSUME}/api/order/cancel`;
       let config = {
         method: "PUT", //ELEMENTOS A ENVIAR
         body: JSON.stringify({
           idUser: localStorage.getItem('idUser'),
           idpedido: filteredData[0].NoOrden
         }),
         headers: {
           "Content-Type": "application/json",
           Accept: "application/json",
           authorization : localStorage.getItem('token')
         },
       };
       try {
         const res = await fetch(url, config);
   
         const data_res = await res.json();
         if(data_res.valid){
           alert(data_res.message)
         }else{
           alert(data_res.message)
         }
       } catch (e) {
         console.log(e)
       }

      getSolicitudesactivas()
  
   };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <DataTable
              title={"Pedido Asignado"}
              columns={columns}
              data={filteredData}
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
              <button className="btnEffect btn btn-secondary" onClick={handleEntregarPedido}>Entregado</button>
              <button className="btnEffect btn btn-secondary" onClick={handleCancelPedido}>Cancelado</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};



export default PedidoAsignado;