import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,json,useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
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

function Vventas (props){
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
    const [data,SetData] = useState([])
    
    const hventas=async()=>{
      let fecha ={"fecha":selectedDate}
      const url = `${process.env.REACT_APP_API_CONSUME}/api/reports/salesValue`
      let config = {
          method: "GET", //ELEMENTOS A ENVIAR
          body: JSON.stringify(fecha),
          headers: {
          "Content-Type": "application/json",
          Accept: "application/json", 
          },
      };
      try{
        const res = await fetch(url, config);
        
        const data_res = await res.json();
        //console.log(data_res)
       
      }catch(e){
        console.log(e)
      }
      
  }

  useEffect(() => {/*
    const interval = setInterval(() => {
      datosdb()
    }, 1000);
    return () => clearInterval(interval);*/
  }, []);

  
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-5"></div>
        <div className="col-5">
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="col-2 mb-3 p-0 justify-content-center d-flex">
          <button className="btn btn-secondary btnEffect" onClick={()=>{hventas()}}>
            Filtrar
          </button>
        </div>
      </div>

      <DataTable
        columns={columnas}
        data={data}
        title="Valor de Ventas"
        pagination
        fixedHeader
        fixedHeaderScrollHeight="600px"
        customStyles={customStyles}
        noDataComponent="Indique la fecha para mostrar valor de ventas"
      />
    </React.Fragment >

    )

}
export default Vventas;