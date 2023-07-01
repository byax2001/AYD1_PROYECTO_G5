import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ReactTable from 'react-data-table-component';
const datoprueba=[
]

const columnas=[
    {
        name:'Id',
        selector: row => row.id_producto,
        sortable:true
    },
    {
        name:'Descripcion',
        selector: row => row.descripcion_producto,
        sortable:true,
        grow:2
    },{
        name:'nombre',
        selector: row => row.nombre_producto,
        sortable:true,
        grow:2
    },
    {
      name: 'Imagen',
      cell: row => (
        <img style={{ width: '45px', height:'45px' }} src={row.imagen_producto} className="img-thumbnail"/>
      ),
      width: "120px",
      style: { whiteSpace: 'nowrap'} ,
      // style: { whiteSpace: 'nowrap',height:'22px', width: '300px', backgroundColor:"red"} ,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    
    {
        name:'Precio',
        selector: row => row.precio_producto,
        sortable:true
    },{
      name:'Total Vendidos',
      selector: row => row.total_vendido,
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

function TopProductos (props){
    const [data,SetData] = useState([])

    const getTproductos=async()=>{
      const url = `${process.env.REACT_APP_API_CONSUME}/api/reports/popularproduct/${localStorage.getItem('idempresa')}`
      let config = {
          method: "GET", //ELEMENTOS A ENVIAR
          headers: {
          "Content-Type": "application/json",
          Accept: "application/json", 
          Authorization: `Bearer ${localStorage.getItem('token')}`
          },
      };
      try{
        const res = await fetch(url, config);
        
        const data_res = await res.json()
        console.log(data_res)
        SetData(data_res.data)
       
      }catch(e){
        console.log(e)
      }
    
  }

  useEffect(() => {
    console.log(localStorage.getItem('idempresa'))
    getTproductos()
   /* const interval = setInterval(() => {
      datosdb()
    }, 1000);
    return () => clearInterval(interval);*/
  }, []);

  
    return(
        <ReactTable 
        columns={columnas}
        data={data}
        title="Producto mas Vendido"
        pagination
        fixedHeader
        fixedHeaderScrollHeight="600px"
        customStyles={customStyles}
        noDataComponent="No hay informacion en la base de datos"
        /> )

}
export default TopProductos;