import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import logo from '../images/Logo.png';

const datoprueba=[
]

const columnas=[
    {
        name:'Id',
        selector: row => row.id_voto,
        sortable:true
    },
    {
        name:'Municipio',
        selector: row => row.municipio,
        sortable:true,
        grow:2
    },{
        name:'Departamento',
        selector: row => row.departamento,
        sortable:true,
        grow:2
    },{
        name:'Papeleta',
        selector: row => row.papeleta,
        sortable:true
    },{
      name:'Partido',
      selector: row => row.partido,
      sortable:true
  }
]
const customStyles = {
    noData: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#a2a2a2',
      color:'white'
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
/*2.Total de Usuarios Registrados

3.
Promedio de usuarios registrados por dias
4. 
Promedio de usuarios registrados por mes
5. 
Promedio de usuarios registrados por año */
function TopProductos (props){
    const [usersAcep,setUsersAcep] = useState(0)
    const [usersRec,setUsersRec] = useState(0)

    const [data,SetData] = useState([])
    const datosdb=async()=>{
        /*
      //console.log(process.env.REACT_APP_API_CONSUME)
      const url = `${process.env.REACT_APP_API_CONSUME}/api/get_votos`
      let config = {
          method: "GET", //ELEMENTOS A ENVIAR
          headers: {
          "Content-Type": "application/json",
          Accept: "application/json", 
          },
      };
      try{
        const res = await fetch(url, config);
        
        const data_res = await res.json();
        SetData(data_res)  //se envian los datos a la tabla para ser mostrados.
       
      }catch(e){
        console.log(e)
      }
      */
  }

  useEffect(() => {
   /* const interval = setInterval(() => {
      datosdb()
    }, 1000);
    return () => clearInterval(interval);*/
  }, []);

  
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light position-relative">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">Informe de Ventas</div>
      </nav>
      <Link to={"/adm"} className="btn btnEffect btn-warning btnRT">Regresar</Link>
      <div className='container mt-3'>
        <div className="row text-light bg-dark rounded mb-2 pt-3">
          <div className="col-6 text-center">
            <div className="row"><h6>Total de Usuarios Aceptados</h6></div>
            <div className="row text-center h4"><div>{usersAcep}</div></div>
          </div>
          <div className="col-6 text-center">
            <div className="row"><h6>Total de Usuarios Rechazados</h6></div>
            <div className="row text-center h4"><div>{usersRec}</div></div>
          </div>
        </div>
        <DataTable
          columns={columnas}
          data={data}
          title="Usuarios de Plataforma"
          pagination
          fixedHeader
          fixedHeaderScrollHeight="600px"
          customStyles={customStyles}
          noDataComponent="No hay informacion en la base de datos"
        />
      </div>
    </React.Fragment>
  )

}
export default TopProductos