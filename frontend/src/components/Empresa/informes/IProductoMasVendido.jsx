import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'
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



function IProductoMasVendido(props) {
    const [filtraciones, setFiltraciones] = useState([
        { ft: "Nombre de Pedido", idft: 1 },
        { ft: "Fecha", idft: 2 }
    ])
    const [filtroActual, setfiltroActual] = useState(0)
    const [valfiltro, setValFiltro] = useState("")

    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        setfiltroActual(value)
        if (value == 0) {
            setValFiltro("")
        }

    };
    const [data, SetData] = useState([])

    const filtrar = async () => {
        if (filtroActual == 0) {
            alert("Escoja un Tipo de Filtrado")
            return
        } else if (valfiltro == "") {
            alert('Campo del Filtro no puede ir vacio')
            return
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
                <div className="col-5 mb-3">
                    {filtroActual != 0 && (
                        <div className="">
                            {filtroActual == 2 ? (
                                <input className='form-control' onChange={(e) => { setValFiltro(e.target.value); console.log(e.target.value) }} type="date" />
                            ) : (
                                <input className='form-control' onChange={(e) => { setValFiltro(e.target.value) }} type="text" />
                            )}
                        </div>
                    )}
                </div>
                <div className="col-3">
                    <button className="btn btnEffect btn-secondary" onClick={()=>{filtrar()}}>
                        Filtrar
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <DataTable
                        columns={columnas}
                        data={data}
                        title="Historial de Pedidos"
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        customStyles={customStyles}
                        noDataComponent="No hay informacion en la base de datos"
                    />
                </div>
            </div>

        </React.Fragment >

    
    )

}
export default IProductoMasVendido;