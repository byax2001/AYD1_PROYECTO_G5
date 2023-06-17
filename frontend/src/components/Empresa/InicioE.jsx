
import React, { useState,useEffect  } from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo.png';
//import Amb from '../../images/quesoB.png';
import { Link } from 'react-router-dom';
import Form from './FormE';
import ReactTable from 'react-data-table-component';
import ReactModal from 'react-modal';
import axios from 'axios';
ReactModal.setAppElement('#root'); // Establece el elemento de la aplicación principal
// varaible de stilo
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

//varaibles Necesarias para la Carga de Datos
//Aqui mi filas
/*const data = [
    {
        nombre: 'Chorizo Argentino',   
        descripcion: 'Completo',
        precio: 30,
        tipo: 'Combo',
        empresa: 2,
        imagen: Amb,//sera de validar si me mandaria algun Link
        id:17,
    },
    {
        nombre: 'Queso Doble',   
        descripcion: 'Completo',
        precio: 40,
        tipo: 'Simple',
        empresa: 2,
        imagen: Amb,//sera de validar si me mandaria algun Link
        id:7,
    },
    {
        nombre: 'Bacon',   
        descripcion: 'Completo',
        precio: 80,
        tipo: 'Entrada',
        empresa: 2,
        imagen: Amb,//sera de validar si me mandaria algun Link
        id:1,
    },
  ];*/


const InicioE = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      fetchData(); // Realizar la petición al cargar el componente
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cargaP'); // Reemplaza 'URL_DEL_SERVIDOR' con la URL correcta
        const data = response.data; // Obtener los datos de la respuesta
        setFilteredData(data.data); // Actualizar los datos del componente
        console.log('Datos Obtenidos:', data.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  

      //Aqui mis columnas
    const columns = [
        
      {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
      },
    {
      name: 'Nombre del producto',
      selector: row => row.nombre_producto,
      sortable: true,
    },
      {
        name: 'Descripcion',
        cell: (row) => (
            <button  className='btn btn-secondary' onClick={() => handleClick(row)}>
              {row.descripcion_producto}
            </button>
          ),
        sortable: true,
      },
      {
        name: 'Precio',
        selector: row => row.precio_producto,
        sortable: true,
      },
      {
        name: 'Tipo',
        selector: row => row.tipo_producto_id_tipo_producto,
        sortable: true,
      },
      {
        name: 'Imagen',
        selector: row=> row.imagen_producto,
        cell: (row) => (
            <a href={row.documento} target="_blank" rel="noopener noreferrer">
                <img className='img-thumbnail'
                    src={row.imagen_producto}
                    alt="Fotografia"
                    style={{ width: '400px', cursor: 'pointer' }}
                />
            </a>
          ),
        sortable: true,
      },
     ];

     const handleClick = (row) => {
        setSelectedRow(row);
        setShowModal(true);

      };
      
      const closeModal = () => {
        setShowModal(false);
      };

    return (
        <React.Fragment>
            {/* Navbar*/}

            <nav className="navbar navbar-expand-lg navbar-light bg-warning position-relative">
                <img id="logoStar" src={logo} alt="Logo" />
                <a className="navbar-brand" href="/">AlChilazo</a>
                <div className="h2 text-light">Inicio Empresa</div>
                <div className="btn-group d-inline-flex" data-toggle="buttons">
                    {/*aqui colocaria los link para visitar */}
                    <Link to="/emp/EmPanel" className="btn textForm text-light">Panel de control</Link>
                    <Link to="/" className="btn textForm text-light">Cerrar Sesion</Link>

                </div>
            </nav>

            
            {/* Aqui colocamos la tabla */}

            <div className="container mt-4">
                <div className="my-4">
                <ReactTable
                    title={"Lista Productos"}
                    columns={columns}
                    data={filteredData}
                    customStyles={customStyles}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                />
                </div>
            </div>

            <ReactModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Formulario"
            >
                <Form selectedRow={selectedRow} closeModal={closeModal} />
            </ReactModal>
        </React.Fragment>
    );
};

export default InicioE;
































