import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import logo from '../images/Logo.png';

const datoprueba=[
]

const columnas = [
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
   getInfo()
  }, []);

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
      console.log(data_res)
      setUsersAcep(data_res.totalAprob[0].Aprobadas)
      setUsersRec(data_res.totalDeny[0].Denegadas)
      SetData(data_res.data)
    } catch (e) {
      console.log(e)
    }

  }
  
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light position-relative">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">Informe de Usuarios</div>
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